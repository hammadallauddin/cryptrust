pragma solidity ^0.4.19;

contract Owned {
    address owner;

    modifier onlyowner() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }
}

contract MainContract is Owned {
    uint32 contract_id;
    uint32 validator_id;
    uint32 request_id;

    //mapping organization id to subcontracts
    mapping(uint32 => address) subContracts;  
    
    //for validator management make tructure for validator
    struct Validator {
        bool isActive;
        address addrs;
    }
    
    mapping(uint32 => Validator) validators;
    
    //for requests management
    struct Request {
        uint32 conId;
        address conAdd;
        uint32 amount;
        address proposed1;
        address proposed2;
        address proposed3;
        address proposed4;
        address proposed5;
        
        address validator1;
        uint valid1;
        address validator2;
        uint valid2;
        address validator3;
        uint valid3;
        bool isExamined;
        bool judgement;
    }

    mapping(uint32 => Request) requests;
    
    //log event for new registration of organization
	event newContract(uint32 indexed id, bytes32 indexed registration, address contractAddress, address indexed walletAddress);
    
    //log event for new validator created
	event newValidator(uint32 indexed validator_id);
    
    //log event for donation. shit!!!
    event donation(uint256 indexed d_id, address indexed d_sender, address indexed d_contract, uint256 d_amount);

    //log event for request. 
    event request(uint256 indexed r_id, uint32 indexed con_Id, uint32 amount, address proposed1, address proposed2, address proposed3, address proposed4, address proposed5);

    //log event for judgement
    event request_result(uint32 indexed _request_id, uint32 indexed _contract_id,bool _judgement);

    //emit event for released funds
    event released(address indexed contractAddress, uint32 amount);

    function createSubContract(address pvt, bytes32 reg) public  onlyowner returns (address) {
        address contractAdd = new SubContract(contract_id, pvt); //added parameters to pass to constructor
        subContracts[contract_id] = contractAdd;
        emit newContract(contract_id, reg, contractAdd, pvt);
        contract_id++;
        return contractAdd;
    }
    
    //what's this shit???? who will call it? only event generating. no transfer takes place
    function donate(uint256 d_id, address d_contract, uint256 d_amount) public {
        emit donation(d_id, msg.sender, d_contract, d_amount);
    }
    
    function getBalance(address add) public constant returns(uint) {
        return add.balance;
    }
    
  
    function ifSeeded(address add) constant returns(bool){
        SubContract subContract = SubContract(add);
        return subContract.ifSeeded();
    }
    
    function requestSeeding(address add) {
        SubContract subContract = SubContract(add);
        subContract.initialSeeding();
    }

    //register new validator
    function addValidator(address _add) public onlyowner {
        validators[validator_id] = Validator(true, _add);
        emit newValidator(validator_id);
        validator_id++;
    }
    
    //suspend validator
    function suspendValidator(uint32 id) public onlyowner {
        validators[id].isActive = false;
    }
    
    //reactivate validator
    function reactiveValidator(uint32 id) public onlyowner {
        validators[id].isActive = true;
    }
    
    //request release of funds
    function requestRelease(uint32 contrct_id, uint32 amount) public {
        requests[request_id] = Request(contrct_id, subContracts[contrct_id], amount, validators[0].addrs, validators[1].addrs,validators[2].addrs, validators[3].addrs, validators[4].addrs, 0x0, 0, 0x0, 0, 0x0, 0, false, false);
        emit request(request_id, contrct_id, amount, requests[request_id].proposed1, requests[request_id].proposed2, requests[request_id].proposed3, requests[request_id].proposed4, requests[request_id].proposed5);
        request_id++;
    }
    
    //validator will call this function for endorsement
    function validate(uint32 _request_id, bool ansr) public {
        //if no endorsement is made yet then assign first slot to this endorsement
        if (requests[_request_id].valid1 == 0) {
            if(ansr == true) {
                //1 means true
                requests[_request_id].valid1 = 1;
            }
            else {
                //2 means false
                requests[_request_id].valid1 = 2;
            }
            //store address of validator
            requests[_request_id].validator1 = msg.sender;
        }
        //if one endorsement is made yet then assign second slot to this endorsement
        else if (requests[_request_id].valid2 == 0) {
            if(ansr == true) {
                requests[_request_id].valid2 = 1;
            }
            else {
                requests[_request_id].valid2 = 2;
            }
            requests[_request_id].validator2 = msg.sender;
        }
        //if two endorsements are made yet then assign last slot to this endorsement
        else if (requests[_request_id].valid3 == 0) {
            if(ansr == true) {
                requests[_request_id].valid3 = 1;
            }
            else {
                requests[_request_id].valid3 = 2;
            }
            requests[_request_id].validator3 = msg.sender;
            
            
            //if two or three judgements are negative then below sum would be 5 or 6 else the sum would be 3 or 4
            if(requests[_request_id].valid1+requests[_request_id].valid2+requests[_request_id].valid3 < 5) {
                requests[_request_id].judgement = true;
                requests[_request_id].isExamined = true;

                SubContract cont = SubContract(requests[_request_id].conAdd);
                cont.release(requests[_request_id].amount);
                emit released(requests[_request_id].conAdd, requests[_request_id].amount);
            }
            else {
                requests[_request_id].judgement = false;
                requests[_request_id].isExamined = true;
            }
            
            
            //log event
            emit request_result(_request_id, requests[_request_id].conId, requests[_request_id].judgement);
            }
    }

    
    //"i" is introduced just to get 5 different random numbers for 5 valdators to propose
    function random(uint16 i) private view returns (uint32) {
        return uint32(uint32(keccak256(block.timestamp+i, block.difficulty)))%validator_id;
    }

}

contract SubContract {
    uint32 id;
    address private wallet;
    address private mainConAdd;
    bool private seeded;
    
    //emit event for initial seeding
    event init_seed(address indexed contractAddress, bytes32 str);

    constructor (uint32 _id, address pvt) payable public  {
        id = _id;
        mainConAdd = msg.sender;
        wallet = pvt;
    }

    function ifSeeded() public returns (bool) {
        return seeded;
    }
    
    //will be called by organization from its private address
    function initialSeeding() payable public {
        require(seeded == false);
        require(address(this).balance > 10);
        wallet.transfer(10);
        seeded = true;
    	emit init_seed(this, "0xSeeded");
    }

    //will be called by main contract on validation of spending
    function release(uint32 amount) public {
        require(address(this).balance > amount);
        wallet.transfer(amount);
    }

	function () payable public {  
	}
}

const MainCOntract = artifacts.require("../contracts/MainContract.sol");
contract('MainContact', function (accounts) {

    let sub_contract, contract_id, request_id, amount, p1, p2, p3, p4, p5, old_balance, new_balance;

    before('setup contract for the tests', async function () {
        mainContract = await MainCOntract.new()
    })

    
    
    it('should create first validator', async function() {
        lastTx = await  mainContract.addValidator("0x9ec63a3f1fadf73381bb23aaca495ebf0a515c99");
        assert.equal(lastTx.logs[0].args.validator_id.c[0], 0);
    });

    
    it('should create second validator', async function() {
        lastTx = await  mainContract.addValidator("0xaf74ea844cbb3cd71e07035b81d0e4d295080f88");
        assert.equal(lastTx.logs[0].args.validator_id.c[0], 1);
    });

    
    it('should create third validator', async function() {
        lastTx = await  mainContract.addValidator("0x3149575d003d2ebda748ea9c4f06dae5527eb8ed");
        assert.equal(lastTx.logs[0].args.validator_id.c[0], 2);
    });

    
    it('should create fourth validator', async function() {
        lastTx = await  mainContract.addValidator("0xbfdd4998deba19ebb75580e6d48d8cc8a397b99c");
        assert.equal(lastTx.logs[0].args.validator_id.c[0], 3);
    });

    
    it('should create fifth validator', async function() {
        lastTx = await  mainContract.addValidator("0x10bc8c6397b85c8c7d89da08b70aa868f6f35de4");
        assert.equal(lastTx.logs[0].args.validator_id.c[0], 4);
    });

    it('should create sixth validator', async function() {
        lastTx = await  mainContract.addValidator("0xda8a5034d79b79044b434ca390a365514deba0d0");
        assert.equal(lastTx.logs[0].args.validator_id.c[0], 5);
    });

    
    it('should create organization', async function() {
        lastTx = await  mainContract.createSubContract("0x3d141d3bf920303d38f48b10b707ab2bfc5ac00f",1233);
        assert.equal(lastTx.logs[0].event, "newContract");
        this.sub_contract = lastTx.logs[0].args.contractAddress;
        this.contract_id = lastTx.logs[0].args.id;
    });

    
    it('should should display the intial balance of sub contract', async function() {
        lastTx = await  mainContract.getBalance(this.sub_contract);
        assert.equal(lastTx.c[0], 0);
    });

    
    it('Should say contract is not seeded', async function() {
        lastTx = await  mainContract.ifSeeded(this.sub_contract);
        assert.equal(lastTx, false);
    });

    
    it('Send some amount to sub contract', async function() {
        web3.eth.sendTransaction({from: "0x73dcf8341a8a3a93a9350c659b4f30d4dfe754af", to: this.sub_contract, value: 2000}, 
            (err, result) => {
                if (!err) {
                    console.log(result);
                }
                else {
                    console.log(err);
                }
            });
    });

    
    it('should display the updated balance of sub contract', async function() {
        lastTx = await  mainContract.getBalance(this.sub_contract);
        assert.equal(lastTx.c[0], 2000);
    });

    
    it('should seed some initial amount', async function() {
        lastTx = await  mainContract.requestSeeding(this.sub_contract);
        console.log(lastTx)
    });

    
    it('should should display the balance of sub contract after seeding', async function() {
        lastTx = await  mainContract.getBalance(this.sub_contract);
        this.old_balance = lastTx.c[0]
        assert.equal(lastTx.c[0], 1990);
    });


    it('Should say contract is seeded', async function() {
        lastTx = await  mainContract.ifSeeded(this.sub_contract);
        assert.equal(lastTx, true);
    });


    it('should request for releasing some amount', async function() {
        lastTx = await  mainContract.requestRelease(this.contract_id,100);
        assert.equal(lastTx.logs[0].event, "request");
        this.request_id = lastTx.logs[0].args.r_id.c[0];
        this.amount = lastTx.logs[0].args.amount.c[0]; 
        this.p1 = lastTx.logs[0].args.proposed1;
        this.p2 = lastTx.logs[0].args.proposed2;
        this.p3 = lastTx.logs[0].args.proposed3;
        this.p4 = lastTx.logs[0].args.proposed4;
        this.p5 = lastTx.logs[0].args.proposed5;
        console.log(lastTx.logs[0].args);
    });




    it('should do first validation', async function() {
        lastTx = await  mainContract.validate(this.request_id,true,{from: "0x9ec63a3f1fadf73381bb23aaca495ebf0a515c99" , gas: 917150});
    });


    it('should do second validation', async function() {
        lastTx = await  mainContract.validate(this.request_id,true,{from: "0xaf74ea844cbb3cd71e07035b81d0e4d295080f88", gas: 917150} );
    });

    it('should do third validation', async function() {
        lastTx = await  mainContract.validate(this.request_id,false,{from: "0x3149575d003d2ebda748ea9c4f06dae5527eb8ed", gas: 917150} );
        this.new_balance = web3.eth.getBalance(this.sub_contract);
        assert.equal(1890, this.new_balance)

        console.log(lastTx.logs);
        assert.equal(lastTx.logs[0].event, "request_result");
    });


    it('should request for releasing some amount again', async function() {
        lastTx = await  mainContract.requestRelease(this.contract_id,100);
        assert.equal(lastTx.logs[0].event, "request");
        this.request_id = lastTx.logs[0].args.r_id.c[0];
        this.amount = lastTx.logs[0].args.amount.c[0]; 
        this.p1 = lastTx.logs[0].args.proposed1;
        this.p2 = lastTx.logs[0].args.proposed2;
        this.p3 = lastTx.logs[0].args.proposed3;
        this.p4 = lastTx.logs[0].args.proposed4;
        this.p5 = lastTx.logs[0].args.proposed5;
        console.log(lastTx.logs[0].args);
    });




    it('should do first validation again', async function() {
        lastTx = await  mainContract.validate(this.request_id,false,{from: "0x9ec63a3f1fadf73381bb23aaca495ebf0a515c99", gas: 917150} );
    });


    it('should do second validation again', async function() {
        lastTx = await  mainContract.validate(this.request_id,false,{from: "0xaf74ea844cbb3cd71e07035b81d0e4d295080f88" , gas: 917150} );
    });

    it('should do third validation again', async function() {
        lastTx = await  mainContract.validate(this.request_id,true,{from: "0x3149575d003d2ebda748ea9c4f06dae5527eb8ed" , gas: 917150} );
        this.new_balance = web3.eth.getBalance(this.sub_contract);
        assert.equal(1890, this.new_balance)

        console.log(lastTx.logs);
        assert.equal(lastTx.logs[0].event, "request_result");
    });
})

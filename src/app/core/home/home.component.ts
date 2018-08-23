import { Component, OnInit } from '@angular/core';
import { OrgAuthService } from '../../organizations/auth/org-auth.sevice';
import { ValidatorAuthService } from '../../validators/auth/validator-auth.service';
import { ContractAccessService } from '../../shared/contractAccess.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  sub_contract:any; 
  contract_id:any;
  request_id:any;
  amount:any;
  event:any;
  constructor(
    // private orgAuth: OrgAuthService,
    // private valAuth: ValidatorAuthService
    private contractAccessService: ContractAccessService
  ) { }

  ngOnInit() {
    // this.orgAuth.getAllOrgs();
    // this.valAuth.getAllValidators();
  }

  doEveryThing() {
    this.addFirstValidator();
    this.addSecondValidator();
    this.addThirdValidator();
    this.addFourthValidator();
    this.addFifthValidator();
    // this.addOrg();
  }

  addFirstValidator() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.addValidator("0x9ec63a3f1fadf73381bb23aaca495ebf0a515c99", {from: account, gas: 500000})
        .then(
          (result) => {
            console.log(result);
          })}
    )
  }

  addSecondValidator() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.addValidator("0xaf74ea844cbb3cd71e07035b81d0e4d295080f88", {from: account, gas: 500000})
        .then(
          (result) => {
            console.log(result);
          })}
    )
  }

  addThirdValidator() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.addValidator("0x3149575d003d2ebda748ea9c4f06dae5527eb8ed", {from: account, gas: 500000})
        .then(
          (result) => {
            console.log(result);
          })}
    )
  }

  addFourthValidator() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.addValidator("0xbfdd4998deba19ebb75580e6d48d8cc8a397b99c", {from: account, gas: 500000})
        .then(
          (result) => {
            console.log(result);
          })}
    )
  }

  addFifthValidator() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.addValidator("0x10bc8c6397b85c8c7d89da08b70aa868f6f35de4", {from: account, gas: 500000})
        .then(
          (result) => {
            console.log(result);
          })}
    )
  }

  addOrg() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.createSubContract("0x3d141d3bf920303d38f48b10b707ab2bfc5ac00f",1233, {from: account, gas: 500000})
        .then(
          (result) => {
            this.sub_contract = result.logs[0].args.contractAddress;
            this.contract_id = result.logs[0].args.id;
            console.log(result);
          })}
    )
  }

  requestSeeding() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.requestSeeding(this.sub_contract, {from: account, gas: 500000})
        .then(
          (result) => {
            console.log(result);
          })}
    )
  }

  sendSomeMoney() {
    this.contractAccessService.web3.eth.sendTransaction({from: "0x73dcf8341a8a3a93a9350c659b4f30d4dfe754af", to: this.sub_contract, value: 1000}, 
            (err, result) => {
                if (!err) {
                    console.log(result);
                }
                else {
                    console.log(err);
                }
            });
  }

  requestRelease() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        instance.requestRelease(this.contract_id,100, {from: "0x3d141d3bf920303d38f48b10b707ab2bfc5ac00f", gas: 500000})
        .then(
          (result) => {
            this.request_id = result.logs[0].args.r_id.c[0];
            this.amount = result.logs[0].args.amount.c[0]; 
            console.log(result);
          })}
    )
  }

  firstValidation() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        instance.validate(this.request_id,true,{from: "0x9ec63a3f1fadf73381bb23aaca495ebf0a515c99" , gas: 917150})
        .then(
          (result) => {
            console.log(this.request_id,true)
            console.log(result);
          })}
    )
  }

  secondValidation() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        instance.validate(this.request_id,true,{from: "0xaf74ea844cbb3cd71e07035b81d0e4d295080f88" , gas: 917150})
        .then(
          (result) => {
            console.log(this.request_id,true)
            console.log(result);
          })}
    )
  }

  thirdValidation() {
    this.contractAccessService.MainContract.deployed().then(
		  (instance) => {
        instance.validate(this.request_id, true, {from: "0x3149575d003d2ebda748ea9c4f06dae5527eb8ed", gas: 500000}).then(
          (result) => {
            if(result.logs.length != 0) {
              if(result.logs[0].event == "request_result"){
                let req_id = result.logs[0].args._request_id.c[0];
                let judgement = result.logs[0].args._judgement;
                console.log(judgement);
                if(req_id == this.request_id && judgement == true) {
                  this.withdraw(req_id);
                }
              }
            } else{
              console.log("bhag bakait");
            }
          }
        )
		  }
	  );
  }


  getbalance() {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.getBalance(this.sub_contract, {from: account, gas: 500000})
        .then(
          (result) => {
            console.log(result);
          })}
    )
  }

  withdraw(req_id:number) {
    this.contractAccessService.MainContract.deployed().then(
		  (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
				this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.withdraw(req_id, {from: account, gas: 917150}).then(
          (result) => {
              console.log(result)
          }
        )
		  }
	  );
  }

}

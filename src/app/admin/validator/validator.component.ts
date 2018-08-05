import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../../validators/validator.service';
import { ContractAccessService } from '../../shared/contractAccess.service';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class AdminValidatorComponent implements OnInit {
  vals = []
  constructor(
    private valService: ValidatorService,
    private contractAccessService: ContractAccessService
  ) { }

  ngOnInit() {
    this.vals = this.valService.getAllValidators();
  }

  deactiveVal(index: number) {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.suspendValidator(this.vals[index].val_id, {from: account, gas: 500000})
        .then(
          () => {
            let val = this.vals[index];
            val['status'] = 0;
            this.valService.updateValidator(val, index);
          }
        )
      }
    );
  }

  activeVal(index: number) {
    this.contractAccessService.MainContract.deployed().then(
      (instance) => {
        const account = this.contractAccessService.web3.eth.accounts[0];
        this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
        instance.reactiveValidator(this.vals[index].val_id, {from: account, gas: 500000})
        .then(
          () => {
            let val = this.vals[index];
            val['status'] = 1;
            this.valService.updateValidator(val, index);
          }
        )
      }
    );


  }


}

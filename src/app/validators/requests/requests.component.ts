import { Component, OnInit } from '@angular/core';
import { ContractAccessService } from '../../shared/contractAccess.service';
import { ValidatorAuthService } from '../auth/validator-auth.service';
import { Validator } from '../validator.model';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class ValidatorRequestsComponent implements OnInit {
  requests = [];
	id: number;
  event: any;
  validator: Validator;
  address:any;
  constructor(
    private contractAccessService: ContractAccessService,
    private validatorAuth: ValidatorAuthService,
    private validatorService: ValidatorService
  ) { }

  ngOnInit() {
    this.id = this.validatorAuth.isAuthenticated();
    this.validator = this.validatorService.getValidator(this.id); 
    this.address = this.validator.address;
	  this.contractAccessService.MainContract.deployed().then(
		  (instance) => {
			  this.event = instance.request({}, {fromBlock: 0, toBlock: 'latest'}).watch(
				  (error, result) => {
					if (!error) {
            if(this.address == result.args.proposed1 || this.address == result.args.proposed2 || this.address == result.args.proposed3 || this.address == result.args.proposed4 || this.address == result.args.proposed5) {
              this.requests.push({
                amount: result.args.amount.c[0],
                contract_id: result.args.con_Id.c[0],
                request_id: result.args.r_id.c[0],
                p1: result.args.proposed1,
                p2: result.args.proposed2,
                p3: result.args.proposed3,
                p4: result.args.proposed4,
                p5: result.args.proposed5,
                judgement: false
  
              });
            }
          }
					  else{
            console.log('not working');
            }
            console.log(this.requests);
				  }
			  );
		  }
	  );
  }

  validate(request_id: number, ans: boolean) {
    this.contractAccessService.MainContract.deployed().then(
		  (instance) => {
        instance.validate(request_id, ans, {from: this.address, gas: 500000}).then(
          (result) => {
            console.log(result);
          }
        )
		  }
	  );
  }


  ngOnDestroy() {
	  this.event.stopWatching();
  }
}

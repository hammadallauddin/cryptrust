import { Component, OnInit } from '@angular/core';
import { ValidatorAuthService } from '../validator-auth.service';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators} from '../../../../../node_modules/@angular/forms';
import { Validator } from '../../validator.model';
import { ContractAccessService } from '../../../shared/contractAccess.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class ValidatorSignupComponent implements OnInit {

  constructor(
	  private validatorAuth: ValidatorAuthService,
	  private router: Router,
		private route: ActivatedRoute,
		private contractAccessService: ContractAccessService
	) { }
  isSubmitted = false;
  passwordNotMatch = false;
  emailExist = false;

  signupForm: FormGroup;

  ngOnInit() {
	  this.signupForm = new FormGroup({
		'name': new FormControl(null, Validators.required),
		'wallet': new FormControl(null, Validators.required),
		'email': new FormControl(null, [Validators.required, Validators.email]),
		'password': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
		'repassword': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),	
	});
  }
  

  onSubmit() {
	  if (this.signupForm.valid) {
		if (this.signupForm.value.password === this.signupForm.value.repassword) {
			
			if (this.validatorAuth.ifEmailExist(this.signupForm.value.email) === false) {
			this.contractAccessService.MainContract.deployed().then(
					(instance) => {
						const account = this.contractAccessService.web3.eth.accounts[0];
						this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
						instance.addValidator(this.signupForm.value.wallet, {from: account, gas: 500000})
						.then(
							(result) => {
								const validator = new Validator(
									this.signupForm.value.name,
									this.signupForm.value.email,
									this.signupForm.value.password,
									1,
									this.signupForm.value.wallet,
									result.logs[0].args.validator_id.c[0]
									);
									this.validatorAuth.createValidator(validator);
									this.signupForm.reset();
									this.passwordNotMatch = false;
									this.emailExist = false;
									this.isSubmitted = false;
									this.router.navigate(['../home'], {relativeTo: this.route});
							}
						)
					}
				)
				
			}
			else{
				this.signupForm.reset();
				this.emailExist = true;
			}
		}
		else{
		  this.signupForm.reset();
		  this.passwordNotMatch = true;
		}
	  }
  }

  submitted() {
	  this.isSubmitted = true;
  }
}

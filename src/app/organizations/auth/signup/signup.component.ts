import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from './../../organization.model';
import { OrgAuthService } from './../org-auth.sevice';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContractAccessService } from '../../../shared/contractAccess.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	accountNotCreated = true;
	notSignedUp = true;
	isSubmitted = false;
	passwordNotMatch = false;
	emailExist = false;
	regNumberExist = false;
	signupForm: FormGroup;

	constructor(
		private orgAuth: OrgAuthService,
		private contractAccessService: ContractAccessService,
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.orgAuth.getAllOrgs();
		this.signupForm = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'description': new FormControl(null, Validators.required),
			'owner_name': new FormControl(null, Validators.required),
			'registration_number': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'permanent_wallet': new FormControl(null, Validators.required),
			'password': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
			'repassword': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
		  });
	}

	onSubmit() {
		if (this.signupForm.valid) {
			this.notSignedUp = false;
			this.contractAccessService.MainContract.deployed().then(
				(instance) => {
					const account = this.contractAccessService.web3.eth.accounts[0];
					this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
					instance.createSubContract(this.signupForm.value.permanent_wallet, this.signupForm.value.registration_number, {from: account, gas: 500000})
					.then(
							(result) => {
								this.accountNotCreated = false;
								if (this.signupForm.value.password === this.signupForm.value.repassword) {
									
									if (this.orgAuth.ifEmailExist(this.signupForm.value.email) === false) {
									  if (this.orgAuth.ifRegNumberExist(this.signupForm.value.registration_number) === false) {
										const org = new Organization(
											this.signupForm.value.name,
											this.signupForm.value.owner_name,
											this.signupForm.value.registration_number,
											this.signupForm.value.email,
											this.signupForm.value.description,
											this.signupForm.value.permanent_wallet,
											result.logs[0].args.contractAddress,
											this.signupForm.value.password,
											1
										  );
										this.orgAuth.createOrg(org);
										this.passwordNotMatch = false;
										this.emailExist = false;
										this.isSubmitted = false;
									  } else {
										this.signupForm.reset();
										this.regNumberExist = true;
									  }
									} else {
										this.signupForm.reset();
										this.emailExist = true;
									}
								} else {
								  this.signupForm.reset();
								  this.passwordNotMatch = true;
								}
							}
						)
				});
		}
	}

	submitted() {
		this.isSubmitted = true;
	}

	gotoHome() {
		this.router.navigate(['../home'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
	}
}

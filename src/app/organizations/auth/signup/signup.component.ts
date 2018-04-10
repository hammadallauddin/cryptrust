import { Organization } from './../../organization.model';
import { OrgAuthService } from './../org-auth.sevice';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	isSubmitted = false;
	passwordNotMatch = false;
	emailExist = false;
	regNumberExist = false;
	signupForm: FormGroup;

	constructor(private orgAuth: OrgAuthService) { }

	ngOnInit() {
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
		  const org = new Organization(
			  this.signupForm.value.name,
			  this.signupForm.value.owner_name,
			  this.signupForm.value.registration_number,
			  this.signupForm.value.email,
			  this.signupForm.value.description,
			  this.signupForm.value.permanent_wallet,
			  '0x0a2381b1b3179506c4ea0be001e7a2ba270c0d1c',
			  this.signupForm.value.password
			);
	
		  if (this.signupForm.value.password === this.signupForm.value.repassword) {
			  
			  if (this.orgAuth.ifEmailExist(this.signupForm.value.email) === false) {
				if (this.orgAuth.ifRegNumberExist(this.signupForm.value.registration_number) === false) {
				  this.orgAuth.createOrg(org);
				  this.signupForm.reset();
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
	}

	submitted() {
		this.isSubmitted = true;
	}
}

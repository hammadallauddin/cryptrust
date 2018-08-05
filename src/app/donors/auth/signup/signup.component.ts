import { Router, ActivatedRoute } from '@angular/router';
import { Donors } from './../../donor.model';
import { DonorAuthService } from './../donor-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
	  private donotAuth: DonorAuthService,
	  private router: Router,
	  private route: ActivatedRoute
	) { }
  isSubmitted = false;
  passwordNotMatch = false;
  emailExist = false;
  userExist = false;

  signupForm: FormGroup;

  ngOnInit() {
	  this.signupForm = new FormGroup({
		'fName': new FormControl(null, Validators.required),
		'lName': new FormControl(null, Validators.required),
		'username': new FormControl(null, Validators.required),
		'email': new FormControl(null, [Validators.required, Validators.email]),
		'password': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
		'repassword': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),	
	});
  }
  

  onSubmit() {
	  if (this.signupForm.valid) {
		const donor = new Donors(
			this.signupForm.value.fName,
			this.signupForm.value.lName,
			this.signupForm.value.email,
			this.signupForm.value.username,
			this.signupForm.value.password,
			1
		  );
  
		if (this.signupForm.value.password === this.signupForm.value.repassword) {
			
			if (this.donotAuth.ifEmailExist(this.signupForm.value.email) === false) {
			  if (this.donotAuth.ifUserExist(this.signupForm.value.username) === false) {
				this.donotAuth.createDonor(donor);
				this.signupForm.reset();
				this.passwordNotMatch = false;
				this.emailExist = false;
				this.isSubmitted = false;
				this.router.navigate(['../home'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
			  } else {
				this.signupForm.reset();
				this.userExist = true;
			  }
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

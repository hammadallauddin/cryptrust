import { OrgAuthService } from './../org-auth.sevice';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	loginFailed = 0;
	isSubmitted = false;
	signinForm: FormGroup;

  constructor(private orgAtuhService: OrgAuthService) { }

  ngOnInit() {
	this.signinForm = new FormGroup({
		'email': new FormControl(null, [Validators.required, Validators.email]),
		'password': new FormControl(null , [Validators.required, Validators.maxLength(10), Validators.minLength(6)])
	});
  }

  onSubmit() {
	let email = this.signinForm.value.email;
	let password = this.signinForm.value.password;
	this.loginFailed = this.orgAtuhService.signInOrg(email, password);
}
	
submitted() {
	this.isSubmitted = true;
}

}

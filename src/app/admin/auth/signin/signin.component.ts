import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	loginFailed = 0;
	isSubmitted = false;
	signinForm: FormGroup;

	constructor(private adminAuthService: AdminAuthService) {}
	
	ngOnInit() {
		this.adminAuthService.getAllAdmins();
		this.signinForm = new FormGroup({
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'password': new FormControl(null , [Validators.required, Validators.maxLength(10), Validators.minLength(6)])
		});
	}

	onSubmit() {
		let email = this.signinForm.value.email;
		let password = this.signinForm.value.password;
		this.loginFailed = this.adminAuthService.signInAdmin(email, password);
	}
		
	submitted() {
		this.isSubmitted = true;
	}


}

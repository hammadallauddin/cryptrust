import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { ValidatorAuthService } from '../validator-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class ValidatorLoginComponent implements OnInit {
  loginFailed = 0;
	isSubmitted = false;
	signinForm: FormGroup;

	constructor(private validatorAuthService: ValidatorAuthService) {}
	
	ngOnInit() {
		this.signinForm = new FormGroup({
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'password': new FormControl(null , [Validators.required, Validators.maxLength(10), Validators.minLength(6)])
		});
	}

	onSubmit() {
		let email = this.signinForm.value.email;
		let password = this.signinForm.value.password;
		this.loginFailed = this.validatorAuthService.signInValidator(email, password);
	}
		
	submitted() {
		this.isSubmitted = true;
	}

}

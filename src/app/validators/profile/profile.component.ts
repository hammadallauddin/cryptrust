import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ValidatorAuthService } from '../auth/validator-auth.service';
import { ValidatorService } from '../validator.service';
import { Validator } from '../validator.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ValidatorProfileComponent implements OnInit {

	validator: Validator;
	id: number;
	passwordNotMatch = false;
	changePassword = false;
	changePasswordForm: FormGroup;
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private validatorService: ValidatorService,
		private validatorAuthService: ValidatorAuthService
	) { }
	
	ngOnInit() {
		this.id = this.validatorAuthService.isAuthenticated();
		this.validator = this.validatorService.getValidator(this.id);
		this.changePasswordForm = new FormGroup({
			'password': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
			'repassword': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
		});
	}

	onChangePassword() {
		this.changePassword = true;
	}

	onCancel() {
		this.changePassword = false;
	}

	onProfileEdit() {
		this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
	}

	onSubmit() {
		if ( this.changePasswordForm.valid ) {
			if (this.changePasswordForm.value.password === this.changePasswordForm.value.repassword) {
				this.validator['password'] = this.changePasswordForm.value.password;
				this.validatorService.updateValidator(this.validator, this.id);
				this.changePasswordForm.reset();
				this.passwordNotMatch = false;
				this.changePassword = false;
			} else {
			  this.changePasswordForm.reset();
			  this.passwordNotMatch = true;
			}
		}
	}
}

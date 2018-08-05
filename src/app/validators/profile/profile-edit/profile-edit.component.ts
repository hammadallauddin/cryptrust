import { Component, OnInit } from '@angular/core';
import { Validator } from '../../validator.model';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ValidatorService } from '../../validator.service';
import { ValidatorAuthService } from '../../auth/validator-auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ValidatorProfileEditComponent implements OnInit {
  invalid_inputs = false;
	validator: Validator;
	id: number;
	editProfileForm: FormGroup;

  	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private validatorService: ValidatorService,
		private validatorAuthService: ValidatorAuthService
	) { }

  	ngOnInit() {

		this.id = this.validatorAuthService.isAuthenticated();
		this.validator = this.validatorService.getValidator(this.id);
		
			
		this.editProfileForm = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'wallet': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email])
		});
		
		this.editProfileForm.setValue({
			'name': this.validator.name,
			'wallet': this.validator.address,
			'email': this.validator.email,
		});
	}

	onSubmit() {
			if (this.editProfileForm.valid) {
				this.validator['name'] = this.editProfileForm.value.name;
				this.validator['address'] = this.editProfileForm.value.wallet;
				this.validator['email'] = this.editProfileForm.value.email;
				this.validatorService.updateValidator(this.validator, this.id);
				this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
			} else {
				this.invalid_inputs = true;
			}
	}

}

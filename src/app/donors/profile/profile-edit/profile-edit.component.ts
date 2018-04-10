import { DonorAuthService } from './../../auth/donor-auth.service';
import { DonorsService } from './../../donors.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Donors } from '../../donor.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
	invalid_inputs = false;
	donor: Donors;
	id: number;
	editProfileForm: FormGroup;

  	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private donorsService: DonorsService,
		private donorAuthService: DonorAuthService
	) { }

  	ngOnInit() {

		this.id = this.donorAuthService.isAuthenticated();
		this.donor = this.donorsService.getDonor(this.id);
		
			
		this.editProfileForm = new FormGroup({
			'fName': new FormControl(null, Validators.required),
			'lName': new FormControl(null, Validators.required),
			'username': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email])
		});
		
		this.editProfileForm.setValue({
			'fName': this.donor.first_name,
			'lName': this.donor.last_name,
			'username': this.donor.username,
			'email': this.donor.email,
		});
	}

	onSubmit() {
			if (this.editProfileForm.valid) {
				this.donor['first_name'] = this.editProfileForm.value.fName;
				this.donor['last_name'] = this.editProfileForm.value.lName;
				this.donor['username'] = this.editProfileForm.value.username;
				this.donor['email'] = this.editProfileForm.value.email;
				this.donorsService.updateDonor(this.donor, this.id);
				this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
			} else {
				this.invalid_inputs = true;
			}
	}

}

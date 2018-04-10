import { DonorsService } from './../donors.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Donors } from './../donor.model';
import { DonorAuthService } from './../auth/donor-auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	donor: Donors;
	id: number;
	passwordNotMatch = false;
	changePassword = false;
	changePasswordForm: FormGroup;
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private donorService: DonorsService,
		private donorAuthService: DonorAuthService
	) { }
	
	ngOnInit() {
		this.id = this.donorAuthService.isAuthenticated();
		this.donor = this.donorService.getDonor(this.id);
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
				this.donor['password'] = this.changePasswordForm.value.password;
				this.donorService.updateDonor(this.donor, this.id);
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

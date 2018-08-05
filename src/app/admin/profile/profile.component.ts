import { AdminAuthService } from './../auth/admin-auth.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../admin.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class AdminProfileComponent implements OnInit {

	admin: Admin;
	id: number;
	passwordNotMatch = false;
	changePassword = false;
	changePasswordForm: FormGroup;
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private adminService: AdminService,
		private adminAuthService: AdminAuthService
	) { }
	
	ngOnInit() {
		this.id = this.adminAuthService.isAuthenticated();
		this.admin = this.adminService.getAdmin(this.id);
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
				this.admin['password'] = this.changePasswordForm.value.password;
				this.adminService.updateAdmin(this.admin, this.id);
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

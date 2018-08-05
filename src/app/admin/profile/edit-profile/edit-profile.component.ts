import { Component, OnInit } from '@angular/core';
import { Admin } from '../../admin.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';
import { AdminAuthService } from '../../auth/admin-auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class AdminEditProfileComponent implements OnInit {
	invalid_inputs = false;
	admin: Admin;
	id: number;
	editProfileForm: FormGroup;

  	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private adminService: AdminService,
		private adminAuthService: AdminAuthService
	) { }

  	ngOnInit() {

		this.id = this.adminAuthService.isAuthenticated();
		this.admin = this.adminService.getAdmin(this.id);
		
			
		this.editProfileForm = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'username': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email])
		});
		
		this.editProfileForm.setValue({
			'name': this.admin.name,
			'username': this.admin.username,
			'email': this.admin.email,
		});
	}

	onSubmit() {
			if (this.editProfileForm.valid) {
				this.admin['name'] = this.editProfileForm.value.name;
				this.admin['username'] = this.editProfileForm.value.username;
				this.admin['email'] = this.editProfileForm.value.email;
				this.adminService.updateAdmin(this.admin, this.id);
				this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
			} else {
				this.invalid_inputs = true;
			}
	}
}

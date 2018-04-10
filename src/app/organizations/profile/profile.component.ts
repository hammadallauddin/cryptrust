import { OrganizationService } from './../orgService.service';
import { OrgAuthService } from './../auth/org-auth.sevice';
import { Organization } from './../organization.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	org: Organization;
	id: number;
	passwordNotMatch = false;
	changePassword = false;
	changePasswordForm: FormGroup;

  constructor(
	private router: Router,
	private route: ActivatedRoute,
	private orgService: OrganizationService,
	private orgAuthService: OrgAuthService
  ) { }

  ngOnInit() {
	this.id = this.orgAuthService.isAuthenticated();
	this.org = this.orgService.getOrg(this.id);
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
				this.org['password'] = this.changePasswordForm.value.password;
				this.orgService.updateOrg(this.org, this.id);
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

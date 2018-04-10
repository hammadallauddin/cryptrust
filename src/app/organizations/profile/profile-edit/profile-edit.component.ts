import { Organization } from './../../organization.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../orgService.service';
import { OrgAuthService } from '../../auth/org-auth.sevice';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

	invalid_inputs = false;
	org: Organization;
	id: number;
	editProfileForm: FormGroup;
  constructor(
	private router: Router,
	private route: ActivatedRoute,
	private orgService: OrganizationService,
	private orgAuthService: OrgAuthService
  ) { }

  ngOnInit() {
	this.id = this.orgAuthService.isAuthenticated();
	this.org = this.orgService.getOrg(this.id);
	
		
	this.editProfileForm = new FormGroup({
		'name': new FormControl(null, Validators.required),
		'owner_name': new FormControl(null, Validators.required),
		'registration_number': new FormControl(null, Validators.required),
		'email': new FormControl(null, [Validators.required, Validators.email]),
		'permanent_wallet': new FormControl(null, Validators.required),
		'description': new FormControl(null, Validators.required),
	});
	
	this.editProfileForm.setValue({
		'name': this.org.name,
		'owner_name': this.org.owner_name,
		'registration_number': this.org.registration_number,
		'email': this.org.email,
		'permanent_wallet': this.org.permanent_wallet,
		'description': this.org.description

	});
  }

  onSubmit() {
	if (this.editProfileForm.valid) {
		this.org['name'] = this.editProfileForm.value.name;
		this.org['owner_name'] = this.editProfileForm.value.owner_name;
		this.org['registration_number'] = this.editProfileForm.value.registration_number;
		this.org['email'] = this.editProfileForm.value.email;
		this.org['permanent_wallet'] = this.editProfileForm.value.permanent_wallet;
		this.org['description'] = this.editProfileForm.value.description;
		this.orgService.updateOrg(this.org, this.id);
		this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
	} else {
		this.invalid_inputs = true;
	}
}

}

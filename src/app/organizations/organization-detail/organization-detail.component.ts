import { Donation } from './../../shared/donation.model';
import { DonorAuthService } from './../../donors/auth/donor-auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../orgService.service';
import { Organization } from '../organization.model';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {
	isDonate = false;
	donation = null;
	addressOnly = null;
	showAddressOnly = false;
	emptyFields = false;
	id = null;
	showQr = false;
	orgId: number;
	org: Organization;
	payment = null;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private orgService: OrganizationService,
		private donorAuthService: DonorAuthService
	) { }

  	ngOnInit() {
		this.route.queryParams.subscribe(
		  (param: Params) => {
			this.id = this.donorAuthService.isAuthenticated();
			this.orgId = +param['org'];
			this.org = this.orgService.getOrg(this.orgId);
		  }
		);
  }
  onClickDonate() {
	if (this.id == null) {
		this.router.navigate(['/donors/login']);
	}else {
		this.isDonate = !this.isDonate;
	}
  }

  onCancel() {
	this.isDonate = !this.isDonate;
  }

  onSubmit() {
	  if (this.donation <= 0) {
		this.emptyFields = true;
	  } else {
		this.payment = 'ethereum:' + this.org.sub_wallet	 + '?amount=' + this.donation;
		this.addressOnly = 'ethereum:' + this.org.sub_wallet;
		this.emptyFields = false;
		this.showQr = true;
	  }
  }

  onClickHere() {
	this.showAddressOnly = true;
  }
}

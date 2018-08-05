import { DonorsService } from './../../donors/donors.service';
import { Donors } from './../../donors/donor.model';
import { ContractAccessService } from './../../shared/contractAccess.service';
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
	isMDonate = false;
	donation = null;
	addressOnly = null;
	showAddressOnly = false;
	emptyFields = false;
	id = null;
	showQr = false;
	orgId: number;
	org: Organization;
	payment = null;
	balance: number;
	donor_address: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private orgService: OrganizationService,
		private donorAuthService: DonorAuthService,
		private contractAccessService: ContractAccessService
	) { }

  	ngOnInit() {
		this.route.queryParams.subscribe(
		  (param: Params) => {
			this.id = this.donorAuthService.isAuthenticated();
			this.orgId = +param['org'];
			this.org = this.orgService.getOrg(this.orgId);
		  }
		);

		this.contractAccessService.MainContract.deployed().then(
			(instance) => {
				instance.getBalance(this.org.sub_wallet).then(
					(result) => {
						this.balance = result;
					}
				);
			}
		);
  }
  onClickDonate() {
	if (this.id == null) {
		this.router.navigate(['/donors/login']);
	}else {
		this.isMDonate = false;
		this.isDonate = !this.isDonate;
	}
  }
  onClickManualDonate() {
	if (this.id == null) {
		this.router.navigate(['/donors/login']);
	}else {
		this.isDonate = false;
		this.isMDonate = !this.isDonate;
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

  onDCancel() {
	this.isMDonate = !this.isMDonate;
  }

  onDSubmit() {
	  if (this.donation <= 0 || this.donor_address.length < 1) {
		this.emptyFields = true;
	  } else {
		this.contractAccessService.MainContract.deployed().then(
			(instance) => {
				this.contractAccessService.web3.eth.sendTransaction({from: this.donor_address, to: this.org.sub_wallet, value: this.donation}, 
					(err, result) => {
						if (!err) {
							console.log(result);
						}
						else {
							console.log(err);
						}
					});
				instance.donate(this.id, this.org.sub_wallet, this.donation, {from: this.donor_address, gas: 500000});
				this.router.navigate(['/donors/donations'], {queryParamsHandling: 'preserve'});
			}
		);
	  }
	}
	
	gotoDonations() {
		this.router.navigate(['../../donations'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
	}

}

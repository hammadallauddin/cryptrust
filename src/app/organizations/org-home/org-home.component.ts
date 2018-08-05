import { ContractAccessService } from './../../shared/contractAccess.service';
import { OrganizationService } from './../orgService.service';
import { Organization } from './../organization.model';
import { OrgAuthService } from './../auth/org-auth.sevice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-home',
  templateUrl: './org-home.component.html',
  styleUrls: ['./org-home.component.css']
})
export class OrgHomeComponent implements OnInit {
	is_logged_in = null;
	org: Organization;
	balance: string;
	constructor(
		private orgAuthservice: OrgAuthService,
		private orgService: OrganizationService,
		private contractAccessService: ContractAccessService
	) { }

	ngOnInit() {
		this.is_logged_in = this.orgAuthservice.isAuthenticated();
		if (this.is_logged_in != null) {
			this.org = this.orgService.getOrg(this.is_logged_in);
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
	}

}

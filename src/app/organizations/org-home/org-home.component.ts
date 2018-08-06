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
	initially_seeded = true;
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
					instance.ifSeeded(this.org.sub_wallet, {from: this.org.sub_wallet, gas: 500000}).then(
						(result) => {
							this.initially_seeded = result;
						}
					)
				}
			);
		}
	}

	requestSeeding() {
		if(+this.balance > 10) {
			this.contractAccessService.MainContract.deployed().then(
				(instance) => {
					const account = this.org.permanent_wallet;
					this.contractAccessService.web3.personal.unlockAccount(account, 'hammad');
					instance.requestSeeding(this.org.sub_wallet, {from: account, gas: 500000}).then(
						() => {
							instance.getBalance(this.org.sub_wallet).then(
								(result) => {
									this.balance = result;
									this.initially_seeded = true;
								}
							);
						}
					);
					
				}
			);
		}
	}

	requestFunds() {

	}

}

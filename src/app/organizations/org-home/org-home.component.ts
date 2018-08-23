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
	amount = 0;
	request_submitted = false;
	initially_seeded = 0;
	org: Organization;
	error_while_seeding = false;
	error_while_funding = false;
	balance: string;
	address: any;
	constructor(
		private orgAuthservice: OrgAuthService,
		private orgService: OrganizationService,
		private contractAccessService: ContractAccessService
	) { }

	ngOnInit() {
		if(this.org != null) {
			this.initially_seeded = this.org.seeded;
		}
		this.is_logged_in = this.orgAuthservice.isAuthenticated();
		if (this.is_logged_in != null) {
			this.org = this.orgService.getOrg(this.is_logged_in);
			this.address = this.org.permanent_wallet;
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
					instance.requestSeeding(this.org.sub_wallet, {from: this.address, gas: 500000}).then(
						(result) => {
							console.log(result);
							instance.getBalance(this.org.sub_wallet).then(
								(result) => {
									this.balance = result;
									this.initially_seeded = 1;
									this.org.seeded = 1;
									this.orgService.updateOrg(this.org,this.is_logged_in);
								}
							);
						}
					);
					
				}
			);
		} else {
			this.error_while_seeding = true;
		}
	}

	requestFunds() {
		this.contractAccessService.MainContract.deployed().then(
			(instance) => {
				if(this.amount < +this.balance && this.amount > 0){
					instance.requestRelease(this.is_logged_in-1, this.amount, {from: this.address, gas: 500000}).then(
						(result) => {
							console.log(this.address);
							console.log(result);
						}
					)
					this.request_submitted = true;
				} else {
					this.error_while_funding = true;
				}
				
			}
		);
	}

}

import { Component, OnInit } from '@angular/core';
import { Organization } from '../organization.model';
import { ContractAccessService } from '../../shared/contractAccess.service';
import { OrgAuthService } from '../auth/org-auth.sevice';
import { OrganizationService } from '../orgService.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Withdrawal } from '../../shared/withdrawal.model';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {
  withdrawals = [];
	id: null;
	org: Organization;
	event: any;
	constructor(
		private contractAccessService: ContractAccessService,
		private orgAuthService: OrgAuthService,
		private orgService: OrganizationService,
		private route: ActivatedRoute
	) {}

  ngOnInit() {
		this.id = this.orgAuthService.isAuthenticated();
		this.id = this.orgAuthService.isAuthenticated();
		if(this.id === null) {
			this.id = this.route.snapshot.queryParams['org'];
		}
	  this.org = this.orgService.getOrg(this.id);
	  this.contractAccessService.MainContract.deployed().then(
		  (instance) => {
			  this.event = instance.released({contractAddress: this.org.sub_wallet}, {fromBlock: 0, toBlock: 'latest'}).watch(
				  (error, result) => {
						if (!error) {	
							this.withdrawals.push(new Withdrawal(
								result.args.contractAddress,
								result.args.amount,
								result.transactionHash
							));
							}
							else{
							console.log('not working');
							}
						}
			  );
		  }
	  )
  }

  ngOnDestroy() {
	  this.event.stopWatching();
  }

}

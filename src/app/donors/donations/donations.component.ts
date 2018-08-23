import { DonorAuthService } from './../auth/donor-auth.service';
import { Donation } from './../../shared/donation.model';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractAccessService } from '../../shared/contractAccess.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit, OnDestroy {
	donations = [];
	id: number;
	event: any;
  constructor(
	  private contractAccessService: ContractAccessService,
	  private donorAuth: DonorAuthService
	) { }

  ngOnInit() {
	  this.id = this.donorAuth.isAuthenticated();
	  this.contractAccessService.MainContract.deployed().then(
		  (instance) => {
			  this.event = instance.donation({d_id: this.id}, {fromBlock: 0, toBlock: 'latest'}).watch(
				  (error, result) => {
					if (!error) {
						let time = new Date(this.contractAccessService.web3.eth.getBlock(result.blockNumber).timestamp * 1000);
						let dd = time.getDate();
						let mm = time.getMonth() + 1;
						let yyyy = time.getFullYear();
						let hh = time.getHours();
						let min = time.getMinutes();
						let ss = time.getSeconds();

						let date = mm + '/' + dd + '/' + yyyy + ' :: ' + hh + ':' + min + ':' + ss;
						
						this.donations.push(new Donation(
							result.args.d_id,
							result.args.d_sender,
							result.args.d_contract,
							result.args.d_amount,
							result.transactionHash,
							date
						));
					  }
					  else{
						console.log('not working');
					  }
				  }
			  );
		  }
	  );
  }

  ngOnDestroy() {
	  this.event.stopWatching();
  }
}

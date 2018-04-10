import { DonationService } from './../../core/donation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
	donations: any;
  constructor(private donationService: DonationService) { }

  ngOnInit() {
	  this.donations = this.donationService.getDonations();
  }

}

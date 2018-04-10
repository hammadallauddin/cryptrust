import { DonorAuthService } from './auth/donor-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {

  constructor(private donorAuthService: DonorAuthService) { }

  ngOnInit() {
	  this.donorAuthService.getAllDonors();
  }
}

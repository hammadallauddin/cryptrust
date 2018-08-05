import { DonorAuthService } from './../auth/donor-auth.service';
import { Component, OnInit } from '@angular/core';
import { OrgAuthService } from '../../organizations/auth/org-auth.sevice';

@Component({
  selector: 'app-donors-home',
  templateUrl: './donors-home.component.html',
  styleUrls: ['./donors-home.component.css']
})
export class DonorsHomeComponent implements OnInit {
	is_logged_in = null;
  	constructor(private donorsAuthService: DonorAuthService, private orgAuth: OrgAuthService) { }

  	ngOnInit() {
		this.orgAuth.getAllOrgs();
	 	this.is_logged_in = this.donorsAuthService.isAuthenticated();
  	}

}

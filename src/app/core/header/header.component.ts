import { OrgAuthService } from './../../organizations/auth/org-auth.sevice';
import { DonorAuthService } from './../../donors/auth/donor-auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	state = null;
  constructor(
	  private route: ActivatedRoute,
	  private donorAuthService: DonorAuthService,
	  private orgAuthService: OrgAuthService
	) { }

  ngOnInit() {
	  this.route.queryParams.subscribe(
		  (param: Params) => {
			this.state = param['state'];
		  }
	  );
	}

	auth() {
		return this.donorAuthService.isAuthenticated();
	}

	authOrg() {
		return this.orgAuthService.isAuthenticated();
	}

	onLogout() {
		this.donorAuthService.loggedOut();
	}

	onLogoutO() {
		this.orgAuthService.loggedOut();
	}
	
}

import { AdminAuthService } from './../../admin/auth/admin-auth.service';
import { OrgAuthService } from './../../organizations/auth/org-auth.sevice';
import { DonorAuthService } from './../../donors/auth/donor-auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ValidatorAuthService } from '../../validators/auth/validator-auth.service';

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
	  private orgAuthService: OrgAuthService,
		private adminAuthService: AdminAuthService,
		private valAuthService: ValidatorAuthService
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

	authAdmin() {
		return this.adminAuthService.isAuthenticated();
	}

	authVal() {
		return this.valAuthService.isAuthenticated();
	}

	onLogout() {
		this.donorAuthService.loggedOut();
	}

	onLogoutO() {
		this.orgAuthService.loggedOut();
	}

	onLogoutA() {
		this.adminAuthService.loggedOut();
	}

	onLogoutVal() {
		this.valAuthService.loggedOut();
	}
	
}

import { OrgAuthService } from './organizations/auth/org-auth.sevice';
import { Component, OnInit } from '@angular/core';
import { ValidatorAuthService } from './validators/auth/validator-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(
		private orgAuth: OrgAuthService,
		private valAuth: ValidatorAuthService) { }
	
	  ngOnInit() {
		this.orgAuth.getAllOrgs();
			this.valAuth.getAllValidators();
	  }
	
	}
	
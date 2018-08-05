import { OrgAuthService } from './organizations/auth/org-auth.sevice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private orgAuth: OrgAuthService) {
		
	}

	ngOnInit() {
		this.orgAuth.getAllOrgs();
	}
}

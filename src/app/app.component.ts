import { OrgAuthService } from './organizations/auth/org-auth.sevice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private orgAtuhService: OrgAuthService) {
		
	}

	ngOnInit() {
		this.orgAtuhService.getAllOrgs();
	}
}

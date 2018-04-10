import { OrgAuthService } from './../auth/org-auth.sevice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-home',
  templateUrl: './org-home.component.html',
  styleUrls: ['./org-home.component.css']
})
export class OrgHomeComponent implements OnInit {
	is_logged_in = null;
	constructor(private orgAuthservice: OrgAuthService) { }

	ngOnInit() {
		this.is_logged_in = this.orgAuthservice.isAuthenticated();
	}

}

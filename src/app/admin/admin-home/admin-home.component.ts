import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../auth/admin-auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

	is_logged_in = null;
	constructor(private adminAuthService: AdminAuthService) { }

	ngOnInit() {
	   this.is_logged_in = this.adminAuthService.isAuthenticated();
	}


}

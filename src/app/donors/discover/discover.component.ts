import { Router } from '@angular/router';
import { Organization } from './../../organizations/organization.model';
import { Component, OnInit } from '@angular/core';
import { OrgAuthService } from '../../organizations/auth/org-auth.sevice';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  organizations: Organization[] = [];
  filterString = '';

  constructor(
		private orgAtuhService: OrgAuthService,
		private router: Router
	) { }

  ngOnInit() {
	  this.organizations = this.orgAtuhService.getOrgs();
  }

  onClick(index: number) {
	this.router.navigate(['/organization/detail', index], {queryParams: {'org': index}, queryParamsHandling: 'merge'});
  }

}

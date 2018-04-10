import { Router } from '@angular/router';
import { Organization } from './../../organizations/organization.model';
import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../organizations/orgService.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  organizations: Organization[] = [];
  filterString = '';

  constructor(
	  	private orgService: OrganizationService,
		private router: Router
	) { }

  ngOnInit() {
	  this.organizations = this.orgService.orgs;
  }

  onClick(index: number) {
	this.router.navigate(['/organization/detail', index], {queryParams: {'org': index}, queryParamsHandling: 'merge'});
  }

}

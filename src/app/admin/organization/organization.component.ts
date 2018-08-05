import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../organizations/orgService.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class AdminOrganizationComponent implements OnInit {
  orgs = []
  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    this.orgs = this.orgService.getAllOrgs();
  }

  deactiveOrg(index: number) {
    let org = this.orgs[index];
    org['status'] = 0;
    this.orgService.updateOrg(org, index);
  }

  activeOrg(index: number) {
    let org = this.orgs[index];
    org['status'] = 1;
    this.orgService.updateOrg(org, index);
  }


}

import { Injectable } from '@angular/core';
import { OrgAuthService } from './auth/org-auth.sevice';
import { Organization } from './organization.model';

@Injectable()
export class OrganizationService {

	orgs = [];
	
	constructor (private orgAuthService: OrgAuthService) {
	}

	getOrg(index: number) {
		this.orgs = this.orgAuthService.getOrgs();
		return this.orgs[index];
	}

	getAllOrgs() {
		this.orgs = this.orgAuthService.getOrgs();
		return this.orgs.slice();
	}

	updateOrg(org: Organization, index: number) {
		this.orgs = this.orgAuthService.getOrgs();
		this.orgs[index]  = org;
		this.orgAuthService.updateOrgs(this.orgs);
	}
}

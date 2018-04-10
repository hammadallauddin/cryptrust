import { Injectable } from '@angular/core';
import { OrgAuthService } from './auth/org-auth.sevice';
import { Organization } from './organization.model';

@Injectable()
export class OrganizationService {

	orgs = [];
	
	constructor (private orgAuthService: OrgAuthService) {
		this.orgs = this.orgAuthService.getOrgs();
	}

	getOrg(index: number) {
		return this.orgs[index];
	}

	updateOrg(org: Organization, index: number) {
		this.orgs[index]  = org;
		this.orgAuthService.updateOrgs(this.orgs);
	}
}

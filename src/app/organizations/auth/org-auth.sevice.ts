import { Injectable } from '@angular/core';
import { Organization } from './../organization.model';
import { Http, Response } from '@angular/http';
import {Location} from '@angular/common';

@Injectable()
export class OrgAuthService {

	authenticated = null;
	orgs = [];

	constructor(
		private http: Http,
		private location: Location
	) {}

	createOrg(org: Organization) {
		this.orgs.push(org);
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/orgs.json', this.orgs).subscribe(
			(response) => {
			},
			(error) => console.log(error)
		);
	}

	updateOrgs(org: Organization[]) {
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/orgs.json', org).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}

	getAllOrgs() {
		this.http.get('https://cryptrust-dc8a4.firebaseio.com/orgs.json').subscribe(
			(response: Response) => {
				this.orgs = response.json();
			}
		);
	}

	signInOrg(email: string, password: string) {
		let i = 0;
		if (this.orgs != null) {
			for (let org of this.orgs) {
				if (org['email'] === email && org['password'] === password && org['status']===1) {
					setTimeout(
						() => {
							this.loggedIn(i);
						}, 490
					)
					setTimeout(
						() => {
							this.location.back();
						}, 500
					)
					return i;
				}
				i++;
			}
			return null;
		}
		return null;
	}

	ifEmailExist(email: string) {
		for (let org of this.orgs) {
			if (org['email'] === email) {
				return true;
			}
		}
		return false;
	}

	ifRegNumberExist(regNum: string) {
		for (let org of this.orgs) {
			if (org['registration_number'] === regNum) {
				return true;
			}
		}
		return false;
	}

	getOrgs() {
		return this.orgs.slice();
	}

	loggedIn(id: number) {
		this.authenticated = id;
	}

	loggedOut() {
		this.authenticated = null;
	}

	isAuthenticated() {
		return this.authenticated;
	}
}

import { Injectable } from '@angular/core';
import { Organization } from './../organization.model';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class OrgAuthService {

	authenticated = null;
	orgs: Organization[] = [
		// tslint:disable-next-line:max-line-length
		new Organization('Edhi Foundation', 'Faisal Edhi', '1234145123', 'abc@gmail.com', 'Description of Edhi Foundation', '0x1982e50d2cab66d150fcd4728beca108e97aed63', '0x1982e50d2cab66d150fcd4728beca108e97aed63', 'hammad'),
		new Organization('Chippa Foundation', 'Ramzan Chipa', '179723323', 'abc@yahoo.com', 'Description of Chippa Foundation', '0x1982e50d2cab66d150fcd4728beca108e97aed63', '0x1982e50d2cab66d150fcd4728beca108e97aed63', 'hammad')
	];

	constructor(
		private http: Http,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location
	) {}

	createOrg(org: Organization) {
		this.orgs.push(org);
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/orgs.json', this.orgs).subscribe(
			(response) => {
				this.router.navigate(['../home'], {relativeTo: this.route});
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
				if (org['email'] === email && org['password'] === password) {
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

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Donors } from './../donor.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Location} from '@angular/common';

@Injectable()

export class DonorAuthService {
	donors: Donors[] = [
		{
			'first_name': 'hammad',
			'last_name': 'allauddin',
			'username': 'hammad',
			'email': 'hammad@mgmail.com',
			'password': 'hammad',
		}
	];

	authenticated = null;
	constructor(
		private http: Http,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location
	) {}

	createDonor(donor: Donors) {
		this.donors.push(donor);
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/donors.json', this.donors).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}

	updateDonors(donors: Donors[]) {
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/donors.json', donors).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}


	getAllDonors() {
		this.http.get('https://cryptrust-dc8a4.firebaseio.com/donors.json').subscribe(
			(response: Response) => {
				this.donors = response.json();
			}
		);
	}

	signInDonor(email: string, password: string) {
		let i = 0;
		if (this.donors != null) {
			for (let donor of this.donors) {
				if (donor['email'] === email && donor['password'] === password) {
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
		for (let donor of this.donors) {
			if (donor['email'] === email) {
				return true;
			}
		}
		return false;
	}

	ifUserExist(username: string) {
		for (let donor of this.donors) {
			if (donor['username'] === username) {
				return true;
			}
		}
		return false;
	}

	getDonors() {
		return this.donors.slice();
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

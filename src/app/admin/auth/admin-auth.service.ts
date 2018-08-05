import { Admin } from './../admin.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Location} from '@angular/common';

@Injectable()

export class AdminAuthService {
	admins: Admin[] = [
		{
			'name': 'hammad',
			'username': 'hammad',
			'email': 'hammad@gmail.com',
			'password': 'hammad',
		}
	];

	authenticated = null;
	constructor(
		private http: Http,
		private location: Location
	) {}

	createAdmin(admin: Admin) {
		this.admins.push(admin);
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/admins.json', this.admins).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}

	updateAdmins(admins: Admin[]) {
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/admins.json', admins).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}


	getAllAdmins() {
		this.http.get('https://cryptrust-dc8a4.firebaseio.com/admin.json').subscribe(
			(response: Response) => {
				this.admins = response.json();
			}
		);
	}

	signInAdmin(email: string, password: string) {
		let i = 0;
		if (this.admins != null) {
			for (let admin of this.admins) {
				if (admin['email'] === email && admin['password'] === password) {
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
		for (let admin of this.admins) {
			if (admin['email'] === email) {
				return true;
			}
		}
		return false;
	}

	ifUserExist(username: string) {
		for (let admin of this.admins) {
			if (admin['username'] === username) {
				return true;
			}
		}
		return false;
	}

	getAdmins() {
		return this.admins.slice();
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

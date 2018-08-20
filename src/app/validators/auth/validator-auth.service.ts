import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { Validator } from '../validator.model';

@Injectable()

export class ValidatorAuthService {
	validators: Validator[] = [];

	authenticated = null;
	constructor(
		private http: Http,
		private location: Location
	) {}

	createValidator(validator: Validator) {
		this.validators.push(validator);
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/validator.json', this.validators).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}

	updateValidator(validators: Validator[]) {
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/validator.json', validators).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}


	getAllValidators() {
		this.http.get('https://cryptrust-dc8a4.firebaseio.com/validator.json').subscribe(
			(response: Response) => {
				this.validators = response.json();
			}
		);
	}

	signInValidator(email: string, password: string) {
		let i = 0;
		this.getAllValidators();
		if (this.validators != null) {
			for (let validator of this.validators) {
				if (validator['email'] === email && validator['password'] === password && validator['status'] === 1) {
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
		for (let validator of this.validators) {
			if (validator['email'] === email) {
				return true;
			}
		}
		return false;
	}


	getValidators() {
		return this.validators.slice();
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

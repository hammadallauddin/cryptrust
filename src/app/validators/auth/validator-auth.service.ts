import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import { Validator } from '../validator.model';

@Injectable()

export class ValidatorAuthService {
	validators: Validator[] = [
		new Validator('hammad',
        'hammad@gmail.com',
        'hammad',
        1,
		'0x79f59c92c4b43da9d3909b41893d00546bb0e2a1',
		0
	)
	];

	authenticated = null;
	constructor(
		private http: Http,
		private location: Location
	) {}

	createValidator(validator: Validator) {
		this.validators.push(validator);
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/validators.json', this.validators).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}

	updateValidator(validators: Validator[]) {
		this.http.put('https://cryptrust-dc8a4.firebaseio.com/validators.json', validators).subscribe(
			(response) => console.log(response),
			(error) => console.log(error)
		);
	}


	getAllValidators() {
		this.http.get('https://cryptrust-dc8a4.firebaseio.com/validators.json').subscribe(
			(response: Response) => {
				this.validators = response.json();
			}
		);
	}

	signInValidator(email: string, password: string) {
		let i = 0;
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

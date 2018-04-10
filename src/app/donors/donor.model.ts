export class Donors {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	constructor(fName: string, lName: string, email: string, username: string, password: string) {
		this.first_name = fName;
		this.last_name = lName;
		this.username = username;
		this.email = email;
		this.password = password;
	}
}

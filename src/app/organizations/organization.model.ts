export class Organization {
	name: string;
	description: String;
	owner_name: string;
	registration_number: string;
	email: string;
	permanent_wallet: string;
	sub_wallet: string;
	password: string;

	// tslint:disable-next-line:indent
	// tslint:disable-next-line:max-line-length
	constructor(
		_name: string,
		_owner_name: string,
		_registration_number: string,
		_email: string,
		_description: string,
		_permanent_wallet: string,
		_sub_wallet: string,
		_password: string) {
			this.name = _name;
			this.description = _description;
			this.owner_name = _owner_name;
			this.registration_number = _registration_number;
			this.email = _email;
			this.permanent_wallet  =  _permanent_wallet;
			this.sub_wallet = _sub_wallet;
			this.password = _password;
	}
}

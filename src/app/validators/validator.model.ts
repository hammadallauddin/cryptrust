export class Validator {
	name: string;
	email: string;
	password: string;
    status: number;
	address: string;
	val_id: number;
	constructor(name: string, email: string, password: string, status: number, address: string, val_id:number) {
		this.name = name;
		this.email = email;
		this.password = password;
        this.status = status;
		this.address = address;
		this.val_id = val_id;
	}
}

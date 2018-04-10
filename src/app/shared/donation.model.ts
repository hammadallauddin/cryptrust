export class Donation {
	address: string;
	amount: number;

	constructor(_address: string, _amount: number) {
		this.address = _address;
		this.amount = _amount;
	}
}

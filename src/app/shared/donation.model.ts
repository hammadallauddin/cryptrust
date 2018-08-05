export class Donation {
	donor_id: number;
	sender: string;
	receiver: string;
	amount: number;
	time: string;

	constructor(donor_id: number, sender: string, receiver: string, amount: number, _time: string) {
		this.donor_id = donor_id;
		this.sender = sender;
		this.receiver = receiver;
		this.amount = amount;
		this.time = _time;
	}
}

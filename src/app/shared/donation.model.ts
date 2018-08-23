export class Donation {
	donor_id: number;
	sender: string;
	receiver: string;
	tran_hash: string;
	amount: number;
	time: string;

	constructor(donor_id: number, sender: string, receiver: string, amount: number, t_hash:string ,_time: string) {
		this.donor_id = donor_id;
		this.sender = sender;
		this.receiver = receiver;
		this.amount = amount;
		this.tran_hash = t_hash;
		this.time = _time;
	}
}

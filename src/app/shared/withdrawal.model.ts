export class Withdrawal {
	receiver: string;
	tran_hash: string;
	amount: number;

	constructor(receiver: string, amount: number, t_hash:string) {
		this.receiver = receiver;
		this.amount = amount;
		this.tran_hash = t_hash;
	}
}

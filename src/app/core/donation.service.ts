export class DonationService {
	donations = [{
		'to': '0xfc8dbb0986238a79c5b3718c0f8916f350cd5d7d',
		'from': '0x5d335c90996d86c7cb393b8af65cd3740acf5808',
		'amount': '1',
		'status': 'panding,'
	},
	{
		'to': '0x034fe805099db49c3fffe8694bc773bdc1e3df20',
		'from': '0x5d335c90996d86c7cb393b8af65cd3740acf5808',
		'amount': '2',
		'status': 'completed'
	}
	];

	getDonations() {
		return this.donations.slice();
	}
}

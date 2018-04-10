import { DonorAuthService } from './auth/donor-auth.service';
import { Injectable } from '@angular/core';
import { Donors } from './donor.model';

@Injectable()

export class DonorsService {
	donors = [];
	constructor (private donorsAuthService: DonorAuthService) {
		this.donors = this.donorsAuthService.getDonors();
	}

	getDonor(index: number) {
		return this.donors[index];
	}

	updateDonor(donor: Donors, index: number) {
		this.donors[index]  = donor;
		this.donorsAuthService.updateDonors(this.donors);
	}

}

import { Component, OnInit } from '@angular/core';
import { DonorsService } from '../../donors/donors.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class AdminDonorComponent implements OnInit {
  donors = []
  constructor(private donorService: DonorsService) { }

  ngOnInit() {
    this.donors = this.donorService.getAllDonors();
  }

  deactiveDonor(index: number) {
    let donor = this.donors[index];
    donor['status'] = 0;
    this.donorService.updateDonor(donor, index);
  }

  activeDonor(index: number) {
    let donor = this.donors[index];
    donor['status'] = 1;
    this.donorService.updateDonor(donor, index);
  }

}

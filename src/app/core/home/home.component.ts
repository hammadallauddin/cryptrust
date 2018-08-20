import { Component, OnInit } from '@angular/core';
import { OrgAuthService } from '../../organizations/auth/org-auth.sevice';
import { ValidatorAuthService } from '../../validators/auth/validator-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private orgAuth: OrgAuthService,
    private valAuth: ValidatorAuthService) { }

  ngOnInit() {
    this.orgAuth.getAllOrgs();
		this.valAuth.getAllValidators();
  }

}

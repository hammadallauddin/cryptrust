import { Component, OnInit } from '@angular/core';
import { ValidatorAuthService } from '../auth/validator-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class ValidatorHomeComponent implements OnInit {
  is_logged_in = null;
  constructor(private validatorAuthService: ValidatorAuthService) { }

  ngOnInit() {
    this.validatorAuthService.getAllValidators();
   this.is_logged_in = this.validatorAuthService.isAuthenticated();
  }

}

import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DonorAuthService } from './donor-auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()

export class DonorAuthGuardService implements CanActivate {
	
	constructor(private donorsAuthService: DonorAuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		if (this.donorsAuthService.isAuthenticated() !== null) {
			return true;
		}
		else {
			this.router.navigate(['./donors/login']);
		}
	}
}

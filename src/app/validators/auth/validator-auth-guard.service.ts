import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidatorAuthService } from './validator-auth.service';


@Injectable()

export class ValidatorAuthGuardService implements CanActivate {
	
	constructor(private validatorAuthService: ValidatorAuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		if (this.validatorAuthService.isAuthenticated() !== null) {
			return true;
		}
		else {
			this.router.navigate(['./validators/login']);
		}
	}
}

import { OrgAuthService } from './org-auth.sevice';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()

export class OrgAuthGuardService implements CanActivate {
	
	constructor(private orgAuthService: OrgAuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		if (this.orgAuthService.isAuthenticated() !== null) {
			return true;
		}
		else {
			this.router.navigate(['./organization/login']);
		}
	}
}

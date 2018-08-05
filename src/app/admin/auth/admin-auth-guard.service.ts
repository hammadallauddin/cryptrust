import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';
import { Observable } from 'rxjs';


@Injectable()

export class AdminAuthGuardService implements CanActivate {
	
	constructor(private adminsAuthService: AdminAuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		if (this.adminsAuthService.isAuthenticated() !== null) {
			return true;
		}
		else {
			this.router.navigate(['./admin/login']);
		}
	}
}

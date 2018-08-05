import { Admin } from './admin.model';
import { Injectable } from "@angular/core";
import { AdminAuthService } from "./auth/admin-auth.service";

@Injectable()

export class AdminService {
	admins = [];
	constructor (private adminAuthService: AdminAuthService) {
		this.admins = this.adminAuthService.getAdmins();
	}

	getAdmin(index: number) {
		return this.admins[index];
	}

	updateAdmin(admin: Admin, index: number) {
		this.admins[index]  = admin;
		this.adminAuthService.updateAdmins(this.admins);
	}

}

import { AdminAuthGuardService } from './admin/auth/admin-auth-guard.service';
import { AdminService } from './admin/admin.service';
import { AdminAuthService } from './admin/auth/admin-auth.service';
import { OrganizationService } from './organizations/orgService.service';
import { DonorAuthService } from './donors/auth/donor-auth.service';
import { DonorsService } from './donors/donors.service';
import { CoreModule } from './core/core.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { DonorAuthGuardService } from './donors/auth/donor-auth-guard.service';
import { OrgAuthGuardService } from './organizations/auth/org-auth-guard.service';
import { OrgAuthService } from './organizations/auth/org-auth.sevice';
import { ContractAccessService } from './shared/contractAccess.service';
import { ValidatorAuthGuardService } from './validators/auth/validator-auth-guard.service';
import { ValidatorAuthService } from './validators/auth/validator-auth.service';
import { ValidatorService } from './validators/validator.service';

@NgModule({
  declarations: [
	AppComponent,
  ],
  imports: [
	CoreModule,
    BrowserModule,
	HttpModule,
  ],
  providers: [
	DonorsService,
	DonorAuthService,
	DonorAuthGuardService,
	OrgAuthGuardService,
	OrganizationService,
	OrgAuthService,
	AdminAuthService,
	AdminService,
	ContractAccessService,
	ValidatorAuthGuardService,
	ValidatorAuthService,
	AdminAuthGuardService,
	ValidatorService
],
  bootstrap: [
	  AppComponent
	]
})
export class AppModule { }

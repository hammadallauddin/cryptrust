import { DonationService } from './core/donation.service';
import { OrganizationService } from './organizations/orgService.service';
import { DonorAuthService } from './donors/auth/donor-auth.service';
import { DonorsService } from './donors/donors.service';
import { SharedModule } from './core/shared.module';
import { CoreModule } from './core/core.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { DonorAuthGuardService } from './donors/auth/donor-auth-guard.service';
import { OrgAuthGuardService } from './organizations/auth/org-auth-guard.service';
import { OrgAuthService } from './organizations/auth/org-auth.sevice';

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
	DonationService
],
  bootstrap: [
	  AppComponent
	]
})
export class AppModule { }

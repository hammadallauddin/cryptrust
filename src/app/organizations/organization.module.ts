import { SharedModule } from './../core/shared.module';
import { OrganizationRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';

import {QRCodeModule} from 'angular2-qrcode';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { OrgHomeComponent } from './org-home/org-home.component';
import { DonationsComponent } from './donations/donations.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';

@NgModule({
	declarations: [
		OrganizationsComponent,
		OrganizationDetailComponent,
		SignupComponent,
		SigninComponent,
		OrgHomeComponent,
		DonationsComponent,
		ProfileComponent,
		ProfileEditComponent,
		WithdrawalComponent,
		
	],
	imports: [
		SharedModule,
		OrganizationRoutingModule,
		QRCodeModule
	],

})

export class OrganizationModule {}

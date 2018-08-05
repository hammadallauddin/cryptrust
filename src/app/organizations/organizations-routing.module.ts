import { OrgAuthGuardService } from './auth/org-auth-guard.service';
import { OrgHomeComponent } from './org-home/org-home.component';
import { RouterModule } from '@angular/router';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { OrganizationsComponent } from './organizations.component';
import { Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DonationsComponent } from './donations/donations.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';

const organizationRoutes: Route[] = [
	{path: '' , component: OrganizationsComponent , children: [
		{path: 'home', component: OrgHomeComponent},
		 {path: 'login', component: SigninComponent},
		 {path: 'register', component: SignupComponent},
		 {path: 'profile', component: ProfileComponent, canActivate: [OrgAuthGuardService]},
		 {path: 'profile/edit', component: ProfileEditComponent, canActivate: [OrgAuthGuardService]},
		 {path: 'donations', component: DonationsComponent},
		{path: 'detail/:id', component: OrganizationDetailComponent},
	]}
];

@NgModule({
	imports: [
		RouterModule.forChild(organizationRoutes)
	],
	exports: [
		RouterModule
	]

})
export class OrganizationRoutingModule {}

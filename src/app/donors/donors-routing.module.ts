import { DonorAuthGuardService } from './auth/donor-auth-guard.service';
import { DonorsComponent } from './donors.component';
import { DonorsHomeComponent } from './donors-home/donors-home.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { DonationsComponent } from './donations/donations.component';
import { DiscoverComponent } from './discover/discover.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from './auth/signin/signin.component';

const donorsRoutes: Routes = [
	{path: 'donors' , component: DonorsComponent , children: [
		{path: 'home', component: DonorsHomeComponent},
		{path: 'login', component: SigninComponent},
		{path: 'register', component: SignupComponent},
		{path: 'discover', component: DiscoverComponent},
		{path: 'donations', component: DonationsComponent, canActivate: [DonorAuthGuardService]},
		{path: 'profile', component: ProfileComponent, canActivate: [DonorAuthGuardService]},
		{path: 'profile/edit', component: ProfileEditComponent, canActivate: [DonorAuthGuardService]}
	]}
];

@NgModule({
	imports: [
		RouterModule.forChild(donorsRoutes)
	],
	exports: [
		RouterModule
	]
})
export class DonorsRoutingModule {}

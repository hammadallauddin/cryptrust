import { AdminOrganizationComponent } from './organization/organization.component';
import { AdminValidatorComponent } from './validator/validator.component';
import { AdminDonorComponent } from './donor/donor.component';
import { AdminAuthGuardService } from './auth/admin-auth-guard.service';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminProfileComponent } from './profile/profile.component';
import { AdminEditProfileComponent } from './profile/edit-profile/edit-profile.component';


const adminRoutes: Routes = [
	{path: 'admin' , component: AdminComponent , children: [
		{path: 'home', component: AdminHomeComponent},
		{path: 'login', component: SigninComponent},
		{path: 'register', component: SignupComponent},
		{path: 'profile', component: AdminProfileComponent, canActivate: [AdminAuthGuardService]},
		{path: 'profile/edit', component: AdminEditProfileComponent, canActivate: [AdminAuthGuardService]},
		{path: 'donors', component: AdminDonorComponent, canActivate: [AdminAuthGuardService]},
		{path: 'validators', component: AdminValidatorComponent, canActivate: [AdminAuthGuardService]},
		{path: 'organizations', component: AdminOrganizationComponent, canActivate: [AdminAuthGuardService]},
	]}
];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})

export class AdminRoutingModule {}

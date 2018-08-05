import { RouterModule, Route } from "../../../node_modules/@angular/router";
import { NgModule } from "../../../node_modules/@angular/core";
import { ValidatorsComponent } from "./validators.component";
import { ValidatorHomeComponent } from "./home/home.component";
import { ValidatorSignupComponent } from "./auth/signup/signup.component";
import { ValidatorLoginComponent } from "./auth/login/login.component";
import { ValidatorProfileComponent } from "./profile/profile.component";
import { ValidatorAuthGuardService } from "./auth/validator-auth-guard.service";
import { ValidatorProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { ValidatorRequestsComponent } from "./requests/requests.component";

const validatorsRoutes: Route[] = [
	{path: '' , component: ValidatorsComponent , children: [
		{path: 'home', component: ValidatorHomeComponent},
		{path: 'login', component: ValidatorLoginComponent},
		{path: 'register', component: ValidatorSignupComponent},
		{path: 'profile', component: ValidatorProfileComponent, canActivate: [ValidatorAuthGuardService]},
		{path: 'requets', component: ValidatorRequestsComponent, canActivate: [ValidatorAuthGuardService]},
		{path: 'profile/edit', component: ValidatorProfileEditComponent, canActivate: [ValidatorAuthGuardService]}
	]}
];

@NgModule({
	imports: [
		RouterModule.forChild(validatorsRoutes)
	],
	exports: [
		RouterModule
	]

})

export class ValidatorRoutingModule {}
import { ValidatorsComponent } from "./validators.component";
import { SharedModule } from "../core/shared.module";
import { ValidatorRoutingModule } from "./validators-routing.module";
import { NgModule } from "../../../node_modules/@angular/core";
import { ValidatorHomeComponent } from "./home/home.component";
import { ValidatorSignupComponent } from "./auth/signup/signup.component";
import { ValidatorLoginComponent } from "./auth/login/login.component";
import { ValidatorProfileComponent } from "./profile/profile.component";
import { ValidatorProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { ValidatorRequestsComponent } from "./requests/requests.component";

@NgModule({
	declarations: [
		ValidatorHomeComponent,
		ValidatorsComponent,
		ValidatorLoginComponent,
		ValidatorSignupComponent,
		ValidatorProfileComponent,
		ValidatorRequestsComponent,
		ValidatorProfileEditComponent
	],
	imports: [
		SharedModule,
		ValidatorRoutingModule,
	],

})
export class ValidatorModule {}
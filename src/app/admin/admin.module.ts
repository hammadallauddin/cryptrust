import { SharedModule } from './../core/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { NgModule } from "@angular/core";
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminProfileComponent } from './profile/profile.component';
import { AdminEditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { AdminDonorComponent } from './donor/donor.component';
import { AdminValidatorComponent } from './validator/validator.component';
import { AdminOrganizationComponent } from './organization/organization.component';

@NgModule({
	declarations: [
		AdminComponent,
		AdminHomeComponent,
		SigninComponent,
		SignupComponent,
		AdminProfileComponent,
		AdminEditProfileComponent,
		AdminDonorComponent,
		AdminValidatorComponent,
		AdminOrganizationComponent
	],
	imports: [
		SharedModule,
		AdminRoutingModule,
	],
	providers: [

	]
})

export class AdminModule {}

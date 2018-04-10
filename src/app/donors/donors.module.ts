import { FilterPipe } from './discover/filter-pipe.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { DonorsRoutingModule } from './donors-routing.module';
import { DonorsComponent } from './donors.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { DonationsComponent } from './donations/donations.component';
import { DiscoverComponent } from './discover/discover.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DonorsHomeComponent } from './donors-home/donors-home.component';
import { SharedModule } from '../core/shared.module';

@NgModule({
	declarations: [
		DonorsComponent,
		ProfileComponent,
		ProfileEditComponent,
		DonationsComponent,
		DiscoverComponent,
		SigninComponent,
		SignupComponent,
		DonorsHomeComponent,
		FilterPipe,
	],
	imports: [
		SharedModule,
		DonorsRoutingModule,
	],

	providers: [
	],
})
export class DonorsModule {}

import { SharedModule } from './shared.module';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DonorsModule } from '../donors/donors.module';
import { OrganizationModule } from '../organizations/organization.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
	declarations: [
		HeaderComponent,
		HomeComponent
	],
	imports: [
		AppRoutingModule,
		SharedModule,
		DonorsModule,
		OrganizationModule,
	],
	exports: [
		HeaderComponent,
		AppRoutingModule
	]
})
export class CoreModule {}

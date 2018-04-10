import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [
	{path: '', component: HomeComponent, pathMatch: 'full' },
	{path: 'donors' , loadChildren: './donors/donors.module#DonorsModule' },
	{path: 'organization' , loadChildren: './organizations/organization.module#OrganizationModule' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}

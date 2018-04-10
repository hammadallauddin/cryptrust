import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
@NgModule({
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class SharedModule {}

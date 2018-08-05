import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ReversePipe } from '../shared/reverse.pipe';
@NgModule({
	declarations: [
		ReversePipe
	],

	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ReversePipe
	]
})
export class SharedModule {}

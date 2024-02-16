import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionListRoutingModule } from './institution-list-routing.module';
import { InstitutionListComponent } from './institution-list.component';

import { ButtonDemoModule } from 'src/app/demo/components/uikit/button/buttondemo.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

import { ConfirmationService } from 'primeng/api';
import { UtilService } from 'src/app/shared/util.service';

@NgModule({
	declarations: [
		InstitutionListComponent
	],
	imports: [
		CommonModule,
		InstitutionListRoutingModule,


		TableModule,
		ButtonDemoModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		DropdownModule,
		DialogModule

	],
	providers: [UtilService, ConfirmationService]
})
export class InstitutionListModule { }

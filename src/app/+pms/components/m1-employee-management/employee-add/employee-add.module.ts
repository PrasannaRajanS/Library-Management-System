import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeAddRoutingModule } from './employee-add-routing.module';
import { EmployeeAddComponent } from './employee-add.component';
import { InputTextModule } from 'primeng/inputtext';

import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { UtilService } from 'src/app/shared/util.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import {  KeyFilterModule } from 'primeng/keyfilter';
import { InputMaskModule } from 'primeng/inputmask';





@NgModule({
  declarations: [
    EmployeeAddComponent
  ],
  imports: [
    CommonModule,
    EmployeeAddRoutingModule,
    FormsModule,
	ReactiveFormsModule,

    // Prime ng 
		ToolbarModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		AccordionModule,
		TabViewModule,
		FieldsetModule,
		MenuModule,
		InputTextModule,
		DividerModule,
		SplitterModule,
		PanelModule,
		InputMaskModule,
		// dropdown ng
		AutoCompleteModule,
		DropdownModule,
		CalendarModule,
		// Grid
		TableModule,
		RadioButtonModule,
		ToastModule,
		DialogModule,
		KeyFilterModule

  ],
  providers:[
	UtilService,
	MessageService
  ]
})
export class EmployeeAddModule { }

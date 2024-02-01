import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeAddRoutingModule } from './employee-add-routing.module';
import { EmployeeAddComponent } from './employee-add.component';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
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


@NgModule({
  declarations: [
    EmployeeAddComponent
  ],
  imports: [
    CommonModule,
    EmployeeAddRoutingModule,
    FormsModule,
	ReactiveFormsModule,

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
		// dropdown ng
		AutoCompleteModule,
		DropdownModule,
		CalendarModule
  ]
})
export class EmployeeAddModule { }

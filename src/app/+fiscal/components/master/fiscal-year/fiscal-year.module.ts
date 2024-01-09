import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiscalYearRoutingModule } from './fiscal-year-routing.module';
import { FiscalYearComponent } from './fiscal-year.component';

import {  ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { UtilService } from 'src/app/shared/util.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    FiscalYearComponent
  ],
  imports: [
    CommonModule,
    FiscalYearRoutingModule,

    ReactiveFormsModule,

    TableModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,

    CalendarModule 
  ],
  providers: [UtilService, MessageService, ConfirmationService]
  
})
export class FiscalYearModule { }

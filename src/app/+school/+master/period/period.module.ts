import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { PeriodComponent } from './period.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    PeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRoutingModule,

    ReactiveFormsModule,
    TableModule,
		ButtonModule,
    InputTextModule,
    ToolbarModule,
    ToastModule,
    DropdownModule,
  ]
})
export class PeriodModule { }

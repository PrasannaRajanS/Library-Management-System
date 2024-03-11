import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent } from './employee-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeeListRoutingModule,
    // primeng
    ToolbarModule,
    TableModule,
    DialogModule,
    InputTextModule
  ]
})
export class EmployeeListModule { }

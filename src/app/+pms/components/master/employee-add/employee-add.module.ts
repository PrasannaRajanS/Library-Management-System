import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeAddRoutingModule } from './employee-add-routing.module';
import { EmployeeAddComponent } from './employee-add.component';


@NgModule({
  declarations: [
    EmployeeAddComponent
  ],
  imports: [
    CommonModule,
    EmployeeAddRoutingModule
  ]
})
export class EmployeeAddModule { }

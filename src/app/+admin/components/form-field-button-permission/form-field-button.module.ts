import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldButtonRoutingModule } from './form-field-button-routing.module';
import { FormFieldButtonPermissionComponent } from './form-field-button-permission.component';


@NgModule({
  declarations: [
    FormFieldButtonPermissionComponent
  ],
  imports: [
    CommonModule,
    FormFieldButtonRoutingModule
  ]
})
export class FormFieldButtonModule { }

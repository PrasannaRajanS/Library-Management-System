import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAddRoutingModule } from './student-add-routing.module';
import { StudentAddComponent } from './student-add.component';


@NgModule({
  declarations: [
    StudentAddComponent
  ],
  imports: [
    CommonModule,
    StudentAddRoutingModule
  ]
})
export class StudentAddModule { }

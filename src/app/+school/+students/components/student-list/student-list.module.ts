import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentListRoutingModule } from './student-list-routing.module';
import { StudentListComponent } from './student-list.component';
import { TableModule } from 'primeng/table';
import { ButtonDemoModule } from 'src/app/demo/components/uikit/button/buttondemo.module';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    StudentListComponent
  ],
  imports: [
    CommonModule,
    StudentListRoutingModule,

    TableModule,
		
		ButtonDemoModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		DropdownModule,
		DialogModule
  ]
})
export class StudentListModule { }

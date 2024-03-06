import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAddRoutingModule } from './student-add-routing.module';
import { StudentAddComponent } from './student-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    StudentAddComponent
  ],
  imports: [
    CommonModule,
    StudentAddRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    ToolbarModule,
    ButtonModule,
    ToastModule,
    TabViewModule,
    InputTextModule,

    CalendarModule,
    AutoCompleteModule,
  ],

  providers: [ UtilService , MessageService ]

})
export class StudentAddModule { }

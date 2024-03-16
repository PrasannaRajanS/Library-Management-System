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
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    StudentAddComponent
  ],
  imports: [
    CommonModule,
    StudentAddRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    TabViewModule,
    FileUploadModule,
    InputNumberModule,
    CheckboxModule,
    DialogModule,
    TooltipModule,
    TableModule, 

    CalendarModule,
    AutoCompleteModule,
    DropdownModule,
  ],

  providers: [ UtilService , MessageService ]

})
export class StudentAddModule { }

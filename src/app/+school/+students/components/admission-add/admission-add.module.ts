import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionAddRoutingModule } from './admission-add-routing.module';
import { AdmissionAddComponent } from './admission-add.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    AdmissionAddComponent
  ],
  imports: [
    CommonModule,
    AdmissionAddRoutingModule,

    ButtonModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    InputTextModule,
    RippleModule,
    CheckboxModule,
    ToolbarModule,
    ToastModule,
    AutoCompleteModule,
    TableModule,
    FileUploadModule,
    DialogModule
  ]
})
export class AdmissionAddModule { }

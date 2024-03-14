import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionAddRoutingModule } from './admission-add-routing.module';
import { AdmissionAddComponent } from './admission-add.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule({
  declarations: [
    AdmissionAddComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdmissionAddRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
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
    DialogModule,
    TooltipModule,
    InputMaskModule,
    KeyFilterModule
  ],
  providers:[
    UtilService,
    MessageService
  ]
})
export class AdmissionAddModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageRoutingModule } from './page-routing.module';
import { PageCreationComponent } from './page-creation.component';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputMaskModule } from "primeng/inputmask";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { UtilService } from "../../../shared/util.service";

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageListModule } from '../page-list/page-list.module';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    PageCreationComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule, TableModule, FileUploadModule, ButtonModule, RippleModule,
    InputMaskModule, ToastModule, RatingModule, InputTextareaModule, DropdownModule,
    MultiSelectModule, RadioButtonModule, InputNumberModule, DialogModule,
    InputTextModule,
    ToolbarModule,
    CheckboxModule,

    PageListModule,
    TooltipModule


  ],
  providers: [UtilService, MessageService, ConfirmationService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }

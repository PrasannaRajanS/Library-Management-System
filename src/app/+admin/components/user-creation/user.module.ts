import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserCreationComponent } from './user-creation.component';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputMaskModule } from "primeng/inputmask";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { UtilService } from 'src/app/shared/util.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    UserCreationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,

    ReactiveFormsModule,

    AutoCompleteModule,
    TableModule,
    ButtonModule, RippleModule,
    InputMaskModule, ToastModule, InputTextareaModule, DropdownModule,
    MultiSelectModule, RadioButtonModule, InputNumberModule, DialogModule,
    InputTextModule,
    ToolbarModule,
    CheckboxModule,
    TooltipModule,

    PasswordModule,
    DividerModule
  ],
  providers: [UtilService, MessageService, ConfirmationService],
})
export class UserModule { }

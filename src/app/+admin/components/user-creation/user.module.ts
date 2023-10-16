import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserCreationComponent } from './user-creation.component';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputMaskModule } from "primeng/inputmask";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    UserCreationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,

    AutoCompleteModule,
		CalendarModule,
		InputMaskModule,
		MultiSelectModule,
		InputTextModule,
    ToolbarModule
  ]
})
export class UserModule { }

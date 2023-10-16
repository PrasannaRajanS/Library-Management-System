import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageRoutingModule } from './page-routing.module';
import { PageCreationComponent } from './page-creation.component';

import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputMaskModule } from "primeng/inputmask";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    PageCreationComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,

    AutoCompleteModule,
		CalendarModule,
		InputMaskModule,
		MultiSelectModule,
		InputTextModule,
    ToolbarModule,
    CheckboxModule

    
  ]
})
export class PageModule { }

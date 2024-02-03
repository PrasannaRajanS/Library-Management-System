import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './institution.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

import { MessageService } from 'primeng/api';
import { UtilService } from 'src/app/shared/util.service';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';





@NgModule({
  declarations: [
    InstitutionComponent
  ],
  imports: [

    CommonModule,
    InstitutionRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    ToolbarModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    DropdownModule,
    AutoCompleteModule,
    CheckboxModule,
    CalendarModule 

  ],
  providers: [
    UtilService, MessageService
  ]
})
export class InstitutionModule { }

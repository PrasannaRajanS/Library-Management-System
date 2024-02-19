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
    CheckboxModule
  ]
})
export class AdmissionAddModule { }

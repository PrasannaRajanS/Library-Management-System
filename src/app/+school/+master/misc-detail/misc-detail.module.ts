import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscDetailRoutingModule } from './misc-detail-routing.module';
import { MiscDetailComponent } from './misc-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { UtilService } from 'src/app/shared/util.service';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    MiscDetailComponent
  ],
  imports: [
    CommonModule,
    MiscDetailRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    AutoCompleteModule,
    CheckboxModule,
    TableModule
    
  ],
  providers :[
    UtilService
  ]
})
export class MiscDetailModule { }

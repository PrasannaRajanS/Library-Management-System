import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscDetailRoutingModule } from './misc-detail-routing.module';
import { MiscDetailComponent } from './misc-detail.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilService } from 'src/app/shared/util.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    MiscDetailComponent
  ],
  imports: [
    CommonModule,
    MiscDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    ToolbarModule,
    RippleModule,

    ToastModule,
    ButtonModule,
    InputTextModule,
    AutoCompleteModule,
    TableModule,
    CheckboxModule
    
  ],
  providers:[UtilService,
  MessageService]
})
export class MiscDetailModule { }

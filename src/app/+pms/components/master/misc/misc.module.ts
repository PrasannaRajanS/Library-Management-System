import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscRoutingModule } from './misc-routing.module';
import { MiscComponent } from './misc.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilService } from 'src/app/shared/util.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    MiscComponent
  ],
  imports: [
    CommonModule,
    MiscRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // prime ng
    ToolbarModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule

  
  ],
  providers:[
    UtilService
  ]
})
export class MiscModule { }

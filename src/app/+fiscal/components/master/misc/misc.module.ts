import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscRoutingModule } from './misc-routing.module';
import { MiscComponent } from './misc.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UtilService } from 'src/app/shared/util.service';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from 'src/app/demo/service/product.service';


@NgModule({
  declarations: [
    MiscComponent
  ],
  imports: [
    CommonModule,
    MiscRoutingModule,
    ToolbarModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  providers:[
    MessageService,
    UtilService,
    ProductService
  ]
})
export class MiscModule { }

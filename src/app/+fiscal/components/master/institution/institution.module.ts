import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './institution.component';
import {  ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';



@NgModule({
  declarations: [
    InstitutionComponent
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    ToolbarModule,
    ButtonModule,
    ToastModule ,
    InputTextModule,
    ReactiveFormsModule,
    TabViewModule
  ],
  providers:[
    UtilService,MessageService
  ]
})
export class InstitutionModule { }

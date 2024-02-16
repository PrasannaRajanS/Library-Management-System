import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationListRoutingModule } from './organization-list-routing.module';
import { OrganizationListComponent } from './organization-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from 'src/app/demo/service/product.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    OrganizationListComponent
  ],
  imports: [
    CommonModule,
    OrganizationListRoutingModule,

    // PrimeNg Region Start
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ToastModule
    // PrimeNg Region End

    
  ],
  providers:[
    ProductService,
    MessageService
  ]

})
export class OrganizationListModule { }

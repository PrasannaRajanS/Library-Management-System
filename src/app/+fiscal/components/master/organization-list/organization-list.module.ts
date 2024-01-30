import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationListRoutingModule } from './organization-list-routing.module';
import { OrganizationListComponent } from './organization-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { HttpService } from 'src/app/+admin/services/http.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';



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
    DialogModule

    // PrimeNg Region End

    
  ],
  providers:[
    HttpService,
    ProductService,
    MessageService
  ]

})
export class OrganizationListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePageRoutingModule } from './role-page-routing.module';
import { RolePageAssociateComponent } from './role-page-associate.component';
import { TreeModule } from 'primeng/tree';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilService } from "../../../shared/util.service";
@NgModule({
  declarations: [
    RolePageAssociateComponent
  ],
  imports: [
    CommonModule,
    RolePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule, RippleModule,
    ToolbarModule,
    TreeModule,
    DropdownModule,
    ToastModule,
  ],
  providers:[UtilService,MessageService]
})
export class RolePageModule { }

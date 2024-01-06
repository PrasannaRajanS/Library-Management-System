import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePageRoutingModule } from './role-page-routing.module';
import { RolePageAssociateComponent } from './role-page-associate.component';
import { TreeModule } from 'primeng/tree';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    RolePageAssociateComponent
  ],
  imports: [
    CommonModule,
    RolePageRoutingModule,

    ReactiveFormsModule,
    ButtonModule, RippleModule,
    ToolbarModule,
    TreeModule,
  ]
})
export class RolePageModule { }

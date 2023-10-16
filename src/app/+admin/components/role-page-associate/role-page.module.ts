import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePageRoutingModule } from './role-page-routing.module';
import { RolePageAssociateComponent } from './role-page-associate.component';


@NgModule({
  declarations: [
    RolePageAssociateComponent
  ],
  imports: [
    CommonModule,
    RolePageRoutingModule
  ]
})
export class RolePageModule { }

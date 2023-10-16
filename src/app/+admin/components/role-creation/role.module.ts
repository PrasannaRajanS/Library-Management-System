import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleCreationComponent } from './role-creation.component';


@NgModule({
  declarations: [
    RoleCreationComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }

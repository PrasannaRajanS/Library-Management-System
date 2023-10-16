import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleCreationComponent } from './module-creation.component';


@NgModule({
  declarations: [
    ModuleCreationComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule
  ]
})
export class ModuleModule { }

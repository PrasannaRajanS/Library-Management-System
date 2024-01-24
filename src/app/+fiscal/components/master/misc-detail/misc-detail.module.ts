import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscDetailRoutingModule } from './misc-detail-routing.module';
import { MiscDetailComponent } from './misc-detail.component';


@NgModule({
  declarations: [
    MiscDetailComponent
  ],
  imports: [
    CommonModule,
    MiscDetailRoutingModule
  ]
})
export class MiscDetailModule { }

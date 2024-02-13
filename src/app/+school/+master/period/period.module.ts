import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { PeriodComponent } from './period.component';


@NgModule({
  declarations: [
    PeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRoutingModule
  ]
})
export class PeriodModule { }

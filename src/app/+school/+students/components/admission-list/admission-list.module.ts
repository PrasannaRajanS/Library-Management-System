import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionListRoutingModule } from './admission-list-routing.module';
import { AdmissionListComponent } from './admission-list.component';


@NgModule({
  declarations: [
    AdmissionListComponent
  ],
  imports: [
    CommonModule,
    AdmissionListRoutingModule
  ]
})
export class AdmissionListModule { }

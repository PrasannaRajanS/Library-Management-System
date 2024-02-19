import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionAddComponent } from './admission-add.component';

const routes: Routes = [
  {
    path: 'admission-entry', component: AdmissionAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionAddRoutingModule { }

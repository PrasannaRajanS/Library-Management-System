import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscDetailComponent } from './misc-detail.component';

const routes: Routes = [
  {
    path:"" ,data: { breadcrumb: 'Misc Detail'}, component:MiscDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscDetailRoutingModule { }

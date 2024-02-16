import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodComponent } from './period.component';

const routes: Routes = [
  {
    path: '',data: { breadcrumb: 'Period'}, component: PeriodComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodRoutingModule { }

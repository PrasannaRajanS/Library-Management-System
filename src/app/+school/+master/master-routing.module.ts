import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodComponent } from './period/period.component';

const routes: Routes = [
  {
    path: 'period', data: { breadcrumb: 'Master'},loadChildren:()=>import('./period/period.module').then(m=>m.PeriodModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

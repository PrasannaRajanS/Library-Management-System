import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'period', data: { breadcrumb: 'Master'},loadChildren:()=>import('./period/period.module').then(m=>m.PeriodModule)
  },
  {
    path:'misc', data:{breadcrumb:'Misc'},loadChildren:()=>import ('./misc/misc.module').then(m=>m.MiscModule)
  },
  {
    path:'misc-detail',data:{breadcrumb: 'Misc Detail'}, loadChildren:()=>import('./misc-detail/misc-detail.module').then(m=>m.MiscDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

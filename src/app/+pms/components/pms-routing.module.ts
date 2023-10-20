import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'employee', data: { breadcrumb: 'Employee' }, loadChildren: () => import('./m1-employee-management/employee-management.module').then(m => m.EmployeeManagementModule) },
  { path: 'master', data: { breadcrumb: 'Master' }, loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsRoutingModule { }

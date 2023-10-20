import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'employee-add', data: { breadcrumb: 'Add Employee' }, loadChildren: () => import('../m1-employee-management/employee-add/employee-add.module').then(m => m.EmployeeAddModule) },
  { path: 'employee-list', data: { breadcrumb: 'Employee List' }, loadChildren: () => import('../m1-employee-management/employee-list/employee-list.module').then(m => m.EmployeeListModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }

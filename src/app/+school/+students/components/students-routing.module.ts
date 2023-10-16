import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'student-add', data: { breadcrumb: 'Add Student' }, loadChildren: () => import('./student-add/student-add.module').then(m => m.StudentAddModule) },
  { path: 'student-list', data: { breadcrumb: 'Students List' }, loadChildren: () => import('./student-list/student-list.module').then(m => m.StudentListModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

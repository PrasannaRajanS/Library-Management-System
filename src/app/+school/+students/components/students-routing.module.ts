import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admission-list', data: { breadcrumb: 'Admission List' }, loadChildren: () => import('./admission-list/admission-list.module').then(m => m.AdmissionListModule) },
  { path: 'student-add', data: { breadcrumb: 'Add Student' }, loadChildren: () => import('./student-add/student-add.module').then(m => m.StudentAddModule) },
  { path: 'student-list', data: { breadcrumb: 'Students List' }, loadChildren: () => import('./student-list/student-list.module').then(m => m.StudentListModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

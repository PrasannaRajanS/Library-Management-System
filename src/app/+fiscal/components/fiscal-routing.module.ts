import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'organization', data: { breadcrumb: 'Organization' }, loadChildren: () => import('./master/organization/organization.module').then(m => m.OrganizationModule) },
  { path: 'institution', data: { breadcrumb: 'Institution' }, loadChildren: () => import('./master/institution/institution.module').then(m => m.InstitutionModule) },
  { path: 'fiscal-year', data: { breadcrumb: 'Academic Year' }, loadChildren: () => import('./master/fiscal-year/fiscal-year.module').then(m => m.FiscalYearModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalRoutingModule { }

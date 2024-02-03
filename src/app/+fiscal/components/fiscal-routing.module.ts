import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'organization', data: { breadcrumb: 'Organization' }, loadChildren: () => import('./master/organization/organization.module').then(m => m.OrganizationModule) },
  {path: 'organization-list' , data:{breadcrumb:'organization-list'},loadChildren:()=> import('./master/organization-list/organization-list.module').then(m=>m.OrganizationListModule) },
  {path: 'organization/:id' , data:{breadcrumb:'organization-list'},loadChildren:()=> import('./master/organization/organization.module').then(m=>m.OrganizationModule) },

  { path: 'institution', data: { breadcrumb: 'Institution' }, loadChildren: () => import('./master/institution/institution.module').then(m => m.InstitutionModule) },
  { path: 'institution-list', data: { breadcrumb:'Institution List'}, loadChildren: () => import('./master/institution-list/institution-list.module').then(m => m.InstitutionListModule)},
  { path: 'institution/:id', data: {breadcrumb:'Institution'}, loadChildren: ()=>import('./master/institution/institution.module').then(m => m.InstitutionModule)},
  { path: 'fiscal-year', data: { breadcrumb: 'Academic Year' }, loadChildren: () => import('./master/fiscal-year/fiscal-year.module').then(m => m.FiscalYearModule) },
  { path: 'misc', data:{breadcrumb: 'Misc'},loadChildren:()=>import('./master/misc/misc.module').then(m=>m.MiscModule) },
  { path: 'misc-detail', data:{breadcrumb:'MiscDetail'},loadChildren:()=>import('./master/misc-detail/misc-detail.module').then(m=>m.MiscDetailModule)},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiscalRoutingModule { }

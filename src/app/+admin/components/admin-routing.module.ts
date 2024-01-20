import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'application-creation', data: { breadcrumb: 'Applications' }, loadChildren: () => import('./application-creation/application.module').then(m => m.ApplicationModule) }, //  Only for Developers
  { path: 'module-creation', data: { breadcrumb: 'Modules' }, loadChildren: () => import('./module-creation/module.module').then(m => m.ModuleModule) }, //  Only for Developers

  { path: 'role-creation', data: { breadcrumb: 'Roles' }, loadChildren: () => import('./role-creation/role.module').then(m => m.RoleModule) },
  
  { path: 'page-creation', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./page-creation/page.module').then(m => m.PageModule) },
  { path: 'page-creation/:id', data: { breadcrumb: 'Pages' },  loadChildren: () => import('./page-creation/page.module').then(m => m.PageModule) },
  { path: 'page-list', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./page-list/page-list.module').then(m => m.PageListModule) },

  { path: 'role-page-associate', data: { breadcrumb: 'Role & Page Associate' }, loadChildren: () => import('./role-page-associate/role-page.module').then(m => m.RolePageModule) },
  
  { path: 'user-creation', data: { breadcrumb: 'Users' }, loadChildren: () => import('./user-creation/user.module').then(m => m.UserModule) },
  { path: 'user-creation/:id/:applicationId', data: { breadcrumb: 'Users' },  loadChildren: () => import('./user-creation/user.module').then(m => m.UserModule) },
  { path: 'user-list', data: { breadcrumb: 'Users' }, loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule) },

  { path: 'form-field-button-permission', data: { breadcrumb: 'Form Field & Button Associate' }, loadChildren: () => import('./form-field-button-permission/form-field-button.module').then(m => m.FormFieldButtonModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolePageAssociateComponent } from './role-page-associate.component';

const routes: Routes = [
  {
    path: '', component: RolePageAssociateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolePageRoutingModule { }

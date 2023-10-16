import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleCreationComponent } from './role-creation.component';

const routes: Routes = [
  {
    path: '', component: RoleCreationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }

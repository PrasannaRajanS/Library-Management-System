import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionListComponent } from './institution-list.component';

const routes: Routes = [
  {
    path: '', component: InstitutionListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionListRoutingModule { }

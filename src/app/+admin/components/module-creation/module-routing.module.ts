import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleCreationComponent } from './module-creation.component';

const routes: Routes = [
  {
    path: '', component: ModuleCreationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }

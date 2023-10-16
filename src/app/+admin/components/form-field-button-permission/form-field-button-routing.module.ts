import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormFieldButtonPermissionComponent } from './form-field-button-permission.component';

const routes: Routes = [
  {
    path: '', component: FormFieldButtonPermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormFieldButtonRoutingModule { }

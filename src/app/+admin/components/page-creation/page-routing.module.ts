import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCreationComponent } from './page-creation.component';

const routes: Routes = [
  {
    path: '', component: PageCreationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class PageRoutingModule { }

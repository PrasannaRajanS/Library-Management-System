import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageListRoutingModule } from './page-list-routing.module';
import { PageListComponent } from './page-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonDemoModule } from 'src/app/demo/components/uikit/button/buttondemo.module';
import { ToolbarModule } from 'primeng/toolbar';
import { UtilService } from 'src/app/shared/util.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    PageListComponent
  ],
  imports: [
    CommonModule,
    PageListRoutingModule,

		TableModule,
		
		ButtonDemoModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		DropdownModule,
		DialogModule
  ],
  providers: [UtilService, MessageService, ConfirmationService]
})
export class PageListModule { }

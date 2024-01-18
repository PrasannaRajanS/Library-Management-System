import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { TableModule } from 'primeng/table';
import { ButtonDemoModule } from 'src/app/demo/components/uikit/button/buttondemo.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { UtilService } from 'src/app/shared/util.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    
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
export class UserListModule { }

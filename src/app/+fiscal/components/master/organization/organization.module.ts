import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';



import { UtilService } from 'src/app/shared/util.service';

@NgModule({
  declarations: [
    OrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,

    
    ReactiveFormsModule,

   // Prime Ng Start
    TableModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
    CalendarModule,
    TabViewModule,
    FileUploadModule
     // Prime Ng End

  ],providers: [UtilService, ConfirmationService,MessageService]
})
export class OrganizationModule { }

import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { PeriodComponent } from './period.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';





@NgModule({
  declarations: [
    PeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRoutingModule,

    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    TableModule,
    DialogModule,
    TooltipModule,
 
       
  ],
  providers:[UtilService,MessageService]
  
})
export class PeriodModule { }

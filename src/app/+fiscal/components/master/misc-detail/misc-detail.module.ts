import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscDetailRoutingModule } from './misc-detail-routing.module';
import { MiscDetailComponent } from './misc-detail.component';

import { TableModule } from 'primeng/table';
import { ProfileListRoutingModule } from 'src/app/demo/components/profile/list/profilelist-routing.module';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [MiscDetailComponent],
    imports: [
        CommonModule,
        MiscDetailRoutingModule,

        ReactiveFormsModule,
        FormsModule,
       

        //#region Primeng
        TableModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        ToolbarModule,
        ToastModule,
        AutoCompleteModule,
        // #endregion
    ],
    providers:[
      UtilService,
      MessageService
    ]
})
export class MiscDetailModule {}

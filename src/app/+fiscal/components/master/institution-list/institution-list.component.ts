import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { IInstitution } from 'src/app/+fiscal/services/interfaces/IInstitution';

import { Table } from 'primeng/table';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls:['./institution-list.component.scss']
  
})
export class InstitutionListComponent {

  cols: any[] = [];
  public userDetails: any;
  //selectedItems: IInstitution[] = [];
  public item: IInstitution = {};
  items: IInstitution[] = [];

  deleteDialog: boolean = false;
  ApplicationCreationForm: any;

  constructor(
    private router: Router,
    private httpService: CommonHttpService,
    private messageService: MessageService
  ) {

  }

  ngOnInit() {
    this.GetAll();
  }

  
  public GetAll() {

    try {

      this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.LIST)
        .subscribe({
          next: (result: any) => {
            this.items = result.institutions;
            console.log('GetAll', this.items);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  Edit(item: any) {
    console.log('Edit', item.institutionId);
    this.router.navigate(['/apps/fiscal/institution/', item.institutionId]);
  }

  Delete(data: any) {
    this.deleteDialog = true;
    this.item = { ...data };
  }

  confirmDelete() {
    this.deleteDialog = false;
    let deletedItem: any[] = this.items.filter((val) => val.institutionId === this.item.institutionId);

    console.log('deletedItem', deletedItem);

    if (deletedItem != null && deletedItem.length > 0) {
      var passSaveParams: any = {};

      passSaveParams.InstitutionId = deletedItem[0].institutionId;
      passSaveParams.IsActive = false;
      passSaveParams.UserId = this.userDetails ? this.userDetails.userId : 0;
      passSaveParams.IPAddress = '192.168.1.1';

      this.httpService.globalPost(
        FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.DELETE,
        JSON.stringify(passSaveParams)
      )
        .subscribe({
          next: (result: any) => {

            console.log('confirmDelete',result)

            this.notificationsService(FiscalValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message)
            this.GetAll();

          },
          error: (err: HttpErrorResponse) => console.log(err),

        });
    }

    this.item = {};

  }

  
  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }


  AddPage() {
    this.router.navigate(['/apps/fiscal/institution'])
  }
}

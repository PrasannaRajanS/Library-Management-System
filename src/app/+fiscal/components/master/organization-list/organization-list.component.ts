import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { IOrganization } from 'src/app/+fiscal/services/interfaces/IOrganization';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent {


  //#region List Variables
  cols: any[] = [];
  item: IOrganization = {};
  items: IOrganization[] = [];
  selectedItems: IOrganization[] = [];

  // for Delete
  deleteDialog: boolean = false;
  public userDetails: any;

  constructor(
    private router: Router,
    private httpService: CommonHttpService,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.GetAll();
  }

  public GetAll() {

    try {

      this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ORGANIZATION.LIST)
        .subscribe({
          next: (result: any) => {
            this.items = result.organizations;
            console.log('GetAll', this.items);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }

  AddPage() {
    this.router.navigate(['/apps/fiscal/organization']);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  Edit(item: any) {
    this.router.navigate(['/apps/fiscal/organization/', item.organizationId]);
  }

  Delete(data: any) {
    this.deleteDialog = true;
    this.item = { ...data }
  }

  confirmDelete() {

    this.deleteDialog = false;
    // doubt
    let deletedItem: any[] = this.items.filter((val) => val.organizationId === this.item.organizationId);

    if (deletedItem != null && deletedItem.length > 0) {
      
      var passSaveParams: any = {};

      passSaveParams.organizationId = deletedItem[0].organizationId;
      passSaveParams.isActive = false;
      passSaveParams.userId = this.userDetails ? this.userDetails.userId : 0;
      passSaveParams.ipAddress = '192.168.1.1';

      console.log('passSaveParams', passSaveParams);

      this.httpService.globalPost(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ORGANIZATION.DELETE, JSON.stringify(passSaveParams))
        .subscribe({
          next: (result: any) => {

            this.notificationsService(FiscalValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message)
            this.GetAll();
          },
          error: (err: HttpErrorResponse) => console.log(err),
        });
    }
    this.item = {}
  }


  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }

}



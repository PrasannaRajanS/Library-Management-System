import { Component } from '@angular/core';
import { IPageCreation } from '../../services/interfaces/IPageCreation';
import { Table } from 'primeng/table';
import { AdminAPIConfig } from '../../services/admin-api-config';
import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent {

  //#region List Variables
  cols: any[] = [];

  selectedItems: IPageCreation[] = [];
  item: IPageCreation = {};
  items: IPageCreation[] = [];

  deleteDialog: boolean = false;
  ApplicationCreationForm: any;
  //#endregion


  constructor(
    private utilService: UtilService,
    private httpService: CommonHttpService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }


  ngOnInit() {
    this.GetAll();
  }


  public GetAll() {

    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.PAGE_CREATION.LIST)
        .subscribe({
          next: (result: any) => {
            this.items = result.pages;
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

    console.log('Edit', item.pageId);
    
    this.router.navigate(['/apps/admin/page-creation/', item.pageId]);
    // 
    // this.ModuleId = item.moduleId;
    // this.ModuleCreationForm.get("application")?.setValue(this.ApplicationList.find(app => app.applicationId === item.applicationId));
    // this.ModuleCreationForm.controls['moduleName']?.setValue(item.moduleName);
    // this.ModuleCreationForm.controls['description']?.setValue(item.description);
    // this.IsUpdate = true;
    // this.buttonText = 'Update';
  }

  Delete(data: any) {
    this.deleteDialog = true;
    this.item = { ...data };
  }

  confirmDelete() {

    this.deleteDialog = false;
    let deletedItem: any[] = this.items.filter(val => val.moduleId === this.item.moduleId);

    console.log('deletedItem', deletedItem)

    // if (deletedItem != null && deletedItem.length > 0) {
    //   var passSaveParams: any = {};
    //   passSaveParams.moduleId = deletedItem[0].moduleId;
    //   passSaveParams.applicationId = deletedItem[0].applicationId;
    //   passSaveParams.moduleName = deletedItem[0].moduleName;
    //   passSaveParams.description = deletedItem[0].description;
    //   passSaveParams.isActive = false;  //  1 | 0

    //   console.log(passSaveParams)

    //   this.httpService.globalPost(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.MODULE.DELETE,
    //     JSON.stringify(passSaveParams))
    //     .subscribe({
    //       next: (result: any) => {

    //         this.Clear();
    //         this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message);
    //       },
    //       error: (err: HttpErrorResponse) => console.log(err)
    //     });
    // }

    this.item = {};
  }

  AddPage(){
    this.router.navigate(['/apps/admin/page-creation']);
  }
}

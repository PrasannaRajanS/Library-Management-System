import { Component } from '@angular/core';
import { IUser } from '../../services/interfaces/IUser';
import { UtilService } from 'src/app/shared/util.service';
import { HttpService } from '../../services/http.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AdminAPIConfig } from '../../services/admin-api-config';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  
  //#region List Variables
  cols: any[] = [];

  selectedItems: IUser[] = [];
  item: IUser = {};
  items: IUser[] = [];

  deleteDialog: boolean = false;
  ApplicationCreationForm: any;
  //#endregion


  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }


  ngOnInit() {
    this.GetAll();
  }


  
  public GetAll() {

    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.USER.LIST)
        .subscribe({
          next: (result: any) => {
            this.items = result.users;
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
    console.log('Edit', item);
    // this.router.navigate(['/apps/admin/user-creation/', item.userId]); 
    // this.router.navigate( ['/apps/admin/user-creation/', {id: item.userId, applicationId: item.applicationId}]);
    this.router.navigate(['/apps/admin/user-creation/'], { queryParams: { id: item.userId, applicationId: item.applicationId } });

  }


  
  Delete(data: any) {
    this.deleteDialog = true;
    this.item = { ...data };
  }

  confirmDelete() {

    this.deleteDialog = false;
    let deletedItem: any[] = this.items.filter(val => val.userId === this.item.userId);

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


  AddUser(){
    this.router.navigate(['/apps/admin/user-creation']);
  }

}

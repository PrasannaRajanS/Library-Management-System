import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { UtilService } from 'src/app/shared/util.service';
import { HttpService } from '../../services/http.service';
import { MessageService } from 'primeng/api';
import { AdminAPIConfig } from '../../services/admin-api-config';
import { IRole } from '../../services/interfaces/IRole';

//#region Validation
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import * as yup from "yup";
import { YupAdminValidation } from '../../services/validation-schemas/yup-page-creation';
import { AdminValidation } from '../../services/admin-validation';
//#endregion

import { Table } from 'primeng/table';
import { IApplication } from './../../services/interfaces/IApplication';

@Component({
  selector: 'app-role-creation',
  templateUrl: './role-creation.component.html',
  styleUrls: ['./role-creation.component.scss']
})
export class RoleCreationComponent {

  RoleId: number = 0;
  public buttonText: string = "Save";
  private IsUpdate: boolean = false;
  public userDetails: any;

  //#region UI Validation Variables
  RoleCreationForm: FormGroup<YupFormControls<IRole>>;  //  Step 1

  initialValues: IRole = {   //  Step 2
    roleId: 0,
    applicationId: 0,
    application: null,
    roleName: null,
    description: null,
  }

  validationSchema: yup.ObjectSchema<IRole> = YupAdminValidation.ROLE_CREATION;  //  Step 3

  formError = (controlName: string, formName: any) => {   //  Step 4
    return this.utilService.formError(controlName, formName);
  };
  //#endregion


  //#region Application Name DDL
  ApplicationList: IApplication[] = [];

  //#endregion

  //#region List Variables
  cols: any[] = [];

  selectedItems: IRole[] = [];
  item: IRole = {};
  items: IRole[] = [];

  deleteDialog: boolean = false;
  //#endregion



  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private messageService: MessageService
  ) {
    this.RoleCreationForm = FormHandler.controls<IRole>(this.initialValues);
    this.RoleCreationForm.setValidators(FormHandler.validate<IRole>(this.validationSchema));
  }

  ngOnInit() {
    this.LoadApplication();
    this.GetAll();
  }


  public LoadApplication() {

    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.APPLICATION.LIST)
        .subscribe({
          next: (result: any) => {
            this.ApplicationList = result.applications;
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }

  onChangeApplicationName($event: any) {

    console.log($event)

  }

  public GetAll() {

    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.ROLE_CREATION.LIST)
        .subscribe({
          next: (result: any) => {
            this.items = result.roles;
            console.log('GetAll', this.items);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }



  Save() {
    // console.log(this.RoleCreationForm.value);

    try {
      let _apiUrl: string = '';


      let passSaveParams: any = {};

      if (this.IsUpdate) {  //  UPDATE

        passSaveParams.roleId = this.RoleId;
        passSaveParams.applicationId = this.RoleCreationForm.value['application'].applicationId;
        passSaveParams.roleName = this.RoleCreationForm.value['roleName'];
        passSaveParams.description = (this.RoleCreationForm.value['description'] == null ? '' : this.RoleCreationForm.value['description']);

        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.ROLE_CREATION.UPDATE;

      }
      else {  //  SAVE


        passSaveParams.roleId = 0;
        passSaveParams.applicationId = this.RoleCreationForm.value['application'].applicationId;
        passSaveParams.roleName = this.RoleCreationForm.value['roleName'];
        passSaveParams.description = (this.RoleCreationForm.value['description'] == null ? '' : this.RoleCreationForm.value['description']);

        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.ROLE_CREATION.SAVE;

      }

      console.log("Save / Update Click", JSON.stringify(passSaveParams))

      this.httpService.globalPost(_apiUrl,
        JSON.stringify(passSaveParams))
        .subscribe({
          next: (result: any) => {

            this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message);
            this.Clear();
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });


    } catch (error) {

    }



  }

  Clear() {
    this.buttonText = "Save";
    this.IsUpdate = false;
    this.RoleCreationForm.reset();
    this.GetAll();
  }



  //#region APPLICATION LIST

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  Edit(item: any) {

    console.log('Edit', item);
    this.RoleId = item.roleId;
    this.RoleCreationForm.get("application")?.setValue(this.ApplicationList.find(app => app.applicationId === item.applicationId));
    this.RoleCreationForm.controls['roleName']?.setValue(item.roleName);
    this.RoleCreationForm.controls['description']?.setValue(item.description);
    this.IsUpdate = true;
    this.buttonText = 'Update';
  }


  // Edit(item: any) {

  //   console.log('Edit', item);
  //   this.ModuleId = item.moduleId;
  //   this.ModuleCreationForm.get("application")?.setValue(this.ApplicationList.find(app => app.applicationId === item.applicationId));
  //   this.ModuleCreationForm.controls['moduleName']?.setValue(item.moduleName);
  //   this.ModuleCreationForm.controls['description']?.setValue(item.description);
  //   this.IsUpdate = true;
  //   this.buttonText = 'Update';
  // }

  Delete(data: any) {
    this.deleteDialog = true;
    this.item = { ...data };
  }

  confirmDelete() {

    this.deleteDialog = false;
    let deletedItem: any[] = this.items.filter(val => val.roleId === this.item.roleId);

    console.log('deletedItem', deletedItem)

    if (deletedItem != null && deletedItem.length > 0) {
      var passSaveParams: any = {};
      passSaveParams.roleId = deletedItem[0].roleId;
      passSaveParams.applicationId = deletedItem[0].applicationId;
      passSaveParams.roleName = deletedItem[0].roleName;
      passSaveParams.description = deletedItem[0].description;
      passSaveParams.isActive = false;  //  1 | 0
      passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
      passSaveParams.ipAddress = "192.168.1.1";

      console.log(passSaveParams)

      this.httpService.globalPost(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.ROLE_CREATION.DELETE,
        JSON.stringify(passSaveParams))
        .subscribe({
          next: (result: any) => {

            this.Clear();
            this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
    }

    this.item = {};
  }
  //#endregion

  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }

}
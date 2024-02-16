import { Component } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';

import { AdminAPIConfig } from '../../services/admin-api-config';
import { IModule } from '../../services/interfaces/IModule';
import { IApplication } from './../../services/interfaces/IApplication';

//#region Validation
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import * as yup from "yup";
import { YupAdminValidation } from '../../services/validation-schemas/yup-page-creation';
import { AdminValidation } from '../../services/admin-validation';
import { Table } from 'primeng/table';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
//#endregion

@Component({
  selector: 'app-module-creation',
  templateUrl: './module-creation.component.html',
  styleUrls: ['./module-creation.component.scss']
})
export class ModuleCreationComponent {

  ModuleId: number = 0;
  public buttonText: string = "Save";
  private IsUpdate: boolean = false;
  public userDetails: any;

  //#region UI Validation Variables
  ModuleCreationForm: FormGroup<YupFormControls<IModule>>;  //  Step 1

  initialValues: IModule = {   //  Step 2
    moduleId: 0,
    applicationId: 0,
    application: null,
    moduleName: null,
    description: null,
  }

  validationSchema: yup.ObjectSchema<IModule> = YupAdminValidation.MODULE_CREATION;  //  Step 3

  formError = (controlName: string, formName: any) => {   //  Step 4
    return this.utilService.formError(controlName, formName);
  };
  //#endregion


  //#region Application Name DDL
  ApplicationList: IApplication[] = [];

  //#endregion

  //#region List Variables
  cols: any[] = [];

  selectedItems: IModule[] = [];
  item: IModule = {};
  items: IModule[] = [];

  deleteDialog: boolean = false;
  ApplicationCreationForm: any;
  //#endregion



  constructor(
    private utilService: UtilService,
    private httpService: CommonHttpService,
    private messageService: MessageService
  ) {
    this.ModuleCreationForm = FormHandler.controls<IModule>(this.initialValues);
    this.ModuleCreationForm.setValidators(FormHandler.validate<IModule>(this.validationSchema));
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
    // this.filteredModuleList = _.filter(this.ModuleList, m => {
    //   return m.applicationId == $event.value.applicationId;
    // });

  }

  public GetAll() {

    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.MODULE.LIST)
        .subscribe({
          next: (result: any) => {
            this.items = result.modules;
            console.log('GetAll', this.items);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }



  Save() {
    // console.log(this.ModuleCreationForm.value);

    try {
      let _apiUrl: string = '';


      let passSaveParams: any = {};

      if (this.IsUpdate) {  //  UPDATE

        passSaveParams.moduleId = this.ModuleId;
        passSaveParams.applicationId = this.ModuleCreationForm.value['application'].applicationId;
        passSaveParams.moduleName = this.ModuleCreationForm.value['moduleName'];
        passSaveParams.description = (this.ModuleCreationForm.value['description'] == null ? '' : this.ModuleCreationForm.value['description']);

        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.MODULE.UPDATE;

      }
      else {  //  SAVE


        passSaveParams.moduleId = 0;
        passSaveParams.applicationId = this.ModuleCreationForm.value['application'].applicationId;
        passSaveParams.moduleName = this.ModuleCreationForm.value['moduleName'];
        passSaveParams.description = (this.ModuleCreationForm.value['description'] == null ? '' : this.ModuleCreationForm.value['description']);

        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.MODULE.SAVE;

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
    // this.ModuleCreationForm.controls['application']?.setValue('');
    // this.ModuleCreationForm.controls['description']?.setValue('');
    this.ModuleCreationForm.reset();
    this.GetAll();
  }



  //#region APPLICATION LIST

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  Edit(item: any) {

    console.log('Edit', item);
    this.ModuleId = item.moduleId;
    this.ModuleCreationForm.get("application")?.setValue(this.ApplicationList.find(app => app.applicationId === item.applicationId));
    this.ModuleCreationForm.controls['moduleName']?.setValue(item.moduleName);
    this.ModuleCreationForm.controls['description']?.setValue(item.description);
    this.IsUpdate = true;
    this.buttonText = 'Update';
  }

  Delete(data: any) {
    this.deleteDialog = true;
    this.item = { ...data };
  }

  confirmDelete() {

    this.deleteDialog = false;
    let deletedItem: any[] = this.items.filter(val => val.moduleId === this.item.moduleId);

    console.log('deletedItem', deletedItem)

    if (deletedItem != null && deletedItem.length > 0) {
      var passSaveParams: any = {};
      passSaveParams.moduleId = deletedItem[0].moduleId;
      passSaveParams.applicationId = deletedItem[0].applicationId;
      passSaveParams.moduleName = deletedItem[0].moduleName;
      passSaveParams.description = deletedItem[0].description;
      passSaveParams.isActive = false;  //  1 | 0

      console.log(passSaveParams)

      this.httpService.globalPost(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.MODULE.DELETE,
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

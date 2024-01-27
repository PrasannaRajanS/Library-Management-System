import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

//#region Interfaces
import { IApplication } from './../../services/interfaces/IApplication';
//#endregion
//#region Services
import { UtilService } from 'src/app/shared/util.service';
import { HttpService } from '../../services/http.service';
import { MessageService } from 'primeng/api';
//#endregion

//#region Validation
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import * as yup from "yup";
import { YupAdminValidation } from '../../services/validation-schemas/yup-page-creation';
//#endregion

import { Table } from 'primeng/table';
import { AdminAPIConfig } from '../../services/admin-api-config';
import { AdminValidation } from '../../services/admin-validation';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-application-creation',
    templateUrl: './application-creation.component.html',
    styleUrls: ['./application-creation.component.scss']
})
export class ApplicationCreationComponent {

    ApplicationId: number = 0;
    public buttonText: string = "Save";
    private IsUpdate: boolean = false;
    public userDetails: any;

    //#region UI Validation Variables
    ApplicationCreationForm: FormGroup<YupFormControls<IApplication>>;  //  Step 1

    initialValues: IApplication = {   //  Step 2
        applicationId: null,
        applicationName: null,
        description: null,

        isActive:null,
        userId:null,
        ipAddress:null
    }

    validationSchema: yup.ObjectSchema<IApplication> = YupAdminValidation.APPLICATION_CREATION;  //  Step 3

    formError = (controlName: string, formName: any) => {   //  Step 4
        return this.utilService.formError(controlName, formName);
    };
    //#endregion

    //#region List Variables
    cols: any[] = [];

    selectedItems: IApplication[] = [];
    item: IApplication = {};
    items: IApplication[] = [];

    deleteDialog: boolean = false;
    //#endregion

    constructor(
        private utilService: UtilService,
        private httpService: HttpService,
        private messageService: MessageService
    ) {
        this.ApplicationCreationForm = FormHandler.controls<IApplication>(this.initialValues);  //  Step 5
        this.ApplicationCreationForm.setValidators(FormHandler.validate<IApplication>(this.validationSchema));
    }

    ngOnInit() {

        this.GetAll();

    }


    public GetAll() {

        try {

            this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.APPLICATION.LIST)
                .subscribe({
                    next: (result: any) => {
                        this.items = result.applications;
                          console.log('GetAll', this.items);
                    },
                    error: (err: HttpErrorResponse) => console.log(err)
                });

        } catch (error) {

        }
    }



    Save() {
        console.log(this.ApplicationCreationForm.value);

        try {
            let _apiUrl: string = '';


            let passSaveParams: any = {};

            if (this.IsUpdate) {  //  UPDATE

                passSaveParams.applicationId = this.ApplicationId;
                passSaveParams.applicationName = this.ApplicationCreationForm.value['applicationName'];
                passSaveParams.description = this.ApplicationCreationForm.value['description'];

                passSaveParams.isActive = true;
                passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
                passSaveParams.ipAddress = "192.168.1.1";

                _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.APPLICATION.UPDATE;

            }
            else {  //  SAVE


                passSaveParams.applicationId = 0;
                passSaveParams.applicationName = this.ApplicationCreationForm.value['applicationName'];
                passSaveParams.description = (this.ApplicationCreationForm.value['description'] == null ? '' : this.ApplicationCreationForm.value['description']);

                passSaveParams.isActive = true;
                passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
                passSaveParams.ipAddress = "192.168.1.1";

                _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.APPLICATION.SAVE;

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
        this.ApplicationCreationForm.controls['applicationName']?.setValue('');
        this.ApplicationCreationForm.controls['description']?.setValue('');
        this.ApplicationCreationForm.reset();
        this.GetAll();
    }

    

    //#region APPLICATION LIST

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    Edit(item: any) {

        console.log('Edit',item);
        this.ApplicationId = item.applicationId;
        // this.ApplicationCreationForm.setValue({ applicationName: item.applicationName, description: item.description });
        this.ApplicationCreationForm.controls['applicationName']?.setValue(item.applicationName);
        this.ApplicationCreationForm.controls['description']?.setValue(item.description);
        this.IsUpdate = true;
        this.buttonText = 'Update';
    }

    Delete(data: any) {
        this.deleteDialog = true;
        this.item = { ...data };
    }

    confirmDelete() {

        this.deleteDialog = false;
        let deletedItem: any[] = this.items.filter(val => val.applicationId === this.item.applicationId);

        console.log('deletedItem',deletedItem)

        if (deletedItem != null && deletedItem.length > 0) {
            var passSaveParams: any = {};
            passSaveParams.applicationId = deletedItem[0].applicationId;
            passSaveParams.applicationName = deletedItem[0].applicationName;
            passSaveParams.description = deletedItem[0].description;
            passSaveParams.isActive = false;  //  1 | 0

            console.log(passSaveParams)

            this.httpService.globalPost(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.APPLICATION.DELETE,
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

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';

import { IMisc } from 'src/app/shared/interface/IMisc';
import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import * as yup from 'yup';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { AdminValidation } from 'src/app/+admin/services/admin-validation';

import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';




@Component({
    selector: 'app-misc',
    templateUrl: './misc.component.html',
    styleUrls: ['./misc.component.scss'],
})
export class MiscComponent {

    public miscId: number | null | undefined = 0;
    public userDetails: any;
    public unitDetails: any;
    public buttonText: string = 'Save';
    private IsUpdate: boolean = false;



    //#region List Variables
    deleteDialog: boolean = false;
    cols: any[] = [];
    item: IMisc = {};
    items: IMisc[] = [];
    selectedItems: IMisc[] = [];
    IPAddress: string = "192.168.0.0";

    // Step 1

    MiscForm: FormGroup<YupFormControls<IMisc>>;

    // Step 2

    initialValues: IMisc = {
        miscId: 0,
        name: null,
        description: null,
        selectedMiscName: null,
        keyWord: null,

        isActive: null,
        unitId: null,
        userId: null,
        ipAddress: null,
    };

    // Step 4
    validationSchema: yup.ObjectSchema<IMisc> = YupFiscalValidation.MISC;

    formError = (controlName: string, formName: any) => {
        return this.utilService.formError(controlName, formName);
    };

    constructor(
        private messageService: MessageService,
        private utilService: UtilService,
        private httpService: CommonHttpService
    ) {
        // 3 Step 
        this.MiscForm = FormHandler.controls<IMisc>(this.initialValues);
        // Step 5
        this.MiscForm.setValidators(FormHandler.validate<IMisc>(this.validationSchema));
    }

    // Step 6
    Clear() {
        this.MiscForm.reset();
        this.buttonText = 'Save';
        this.IsUpdate = false;
        this.GetAll();
    }


    // Step 7
    Save() {

        try {
            let _apiUrl: string = '';
            let passSaveParams: any = {};

            if (this.IsUpdate) {
                //  UPDATE

                passSaveParams.miscId = this.miscId;
                passSaveParams.name = this.MiscForm.value['name'] != null ? this.MiscForm.value['name'] : "";
                passSaveParams.description = this.MiscForm.value['description'] != null ? this.MiscForm.value['description'] : "";
                passSaveParams.keyWord = "Fiscal";
                passSaveParams.isActive = true;
                passSaveParams.unitId = this.unitDetails ? this.unitDetails.unitId : 0;
                passSaveParams.userId = this.userDetails ? this.userDetails.userId : 0;
                passSaveParams.ipAddress = this.IPAddress;

                _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.FISCAL.UPDATE;
            } else {
                //  SAVE

                passSaveParams.miscId = 0;
                passSaveParams.name = this.MiscForm.value['name'] != null ? this.MiscForm.value['name'] : "";
                passSaveParams.description = this.MiscForm.value['description'] != null ? this.MiscForm.value['description'] : "";
                passSaveParams.keyWord = "Fiscal";
                passSaveParams.isActive = true;
                passSaveParams.unitId = this.unitDetails ? this.unitDetails.unitId : 0;
                passSaveParams.userId = this.userDetails ? this.userDetails.userId : 0;
                passSaveParams.ipAddress = this.IPAddress;

                _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.FISCAL.SAVE;
            }
            console.log('Before save', passSaveParams);

            this.httpService
                .globalPost(_apiUrl, JSON.stringify(passSaveParams))
                .subscribe({
                    next: (result: any) => {
                        this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message);
                        this.Clear();
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        } catch (error) { }
    }

    // Step 8
    private notificationsService(_severity: any, _summary: any, _message: any) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000, });
        return;
    }


    // Step 9
    public GetAll() {
        try {
            this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.FISCAL.LIST + '?keyWord=Fiscal')
                .subscribe({
                    next: (result: any) => {
                        this.items = result.miscs;
                        console.log('GetAll', this.items);
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        } catch (error) { }
    }


    // Step 10
    ngOnInit() { this.GetAll(); }


    // Step 11
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // Step 12
    Edit(data: any) {
        console.log('Edit', data);
        this.miscId = data.miscId;
        this.MiscForm.controls['name']?.setValue(data.name);
        this.MiscForm.controls['description']?.setValue(data.description);
        this.IsUpdate = true;
        this.buttonText = 'Update';
    }

    // Step 13
    Delete(data: any) {
        this.deleteDialog = true;
        this.item = { ...data };
    }

    // Step 14
    confirmDelete() {
        this.deleteDialog = false;

        let deletedItem: any[] = this.items.filter((val) => val.miscId === this.item.miscId);
        console.log('deletedItem', deletedItem);

        if (deletedItem != null && deletedItem.length > 0) {
            var passSaveParams: any = {};

            passSaveParams.miscId = deletedItem[0].miscId;
            passSaveParams.name = deletedItem[0].name;
            passSaveParams.description = deletedItem[0].description;
            passSaveParams.isActive = false;
            passSaveParams.ipAddress = this.IPAddress;
            passSaveParams.keyWord = "Fiscal"

            console.log(passSaveParams);

            this.httpService.globalPost(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.FISCAL.DELETE,
                JSON.stringify(passSaveParams)).subscribe({
                    next: (result: any) => {
                        this.Clear();
                        this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message);
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        }

        this.item = {};
    }


}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';

import { IAcademicYear } from 'src/app/+fiscal/services/interfaces/IAcademicYear'; //  Model

import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import * as yup from 'yup';

import { UtilService } from 'src/app/shared/util.service';


import { ProductService } from 'src/app/demo/service/product.service';

import { DatePipe } from "@angular/common";
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

@Component({
    selector: 'app-fiscal-year',
    templateUrl: './fiscal-year.component.html',
    styleUrls: ['./fiscal-year.component.scss'],
})


export class FiscalYearComponent {
    buttonText: string = 'Save';
   public AcadamicYearId:number|null|undefined =0;

    private IsUpdate: boolean = false;

    public userDetails: any;

    //#region List Variables

    cols: any[] = [];
    item: IAcademicYear = {};
    items: IAcademicYear[] = [];
    selectedItems: IAcademicYear[] = [];

    deleteDialog: boolean = false;

    //
    AcadamicYearList: IAcademicYear[] = [];

    //#region UI Validation Variables
    AcademicYearForm: FormGroup<YupFormControls<IAcademicYear>>; //  Step 1

    initialValues: IAcademicYear = {
        //  Step 2
        academicYearId: 0,
        academicYear: null,
        startDate: null,
        endDate: null,
        accountYear: null,
        isDefault: null,

        isActive: null,
        userId: null,
        ipAddress: null,
    };

    validationSchema: yup.ObjectSchema<IAcademicYear> =
        YupFiscalValidation.ACADEMIC_YEAR; //  Step 3

    formError = (controlName: string, formName: any) => {
        //  Step 4
        return this.utilService.formError(controlName, formName);
    };
    //#endregion

    constructor(
        private utilService: UtilService,
        private httpService: CommonHttpService,
        private messageService: MessageService,
        private productService: ProductService,
        private _datePipe : DatePipe
    ) {
        this.AcademicYearForm = FormHandler.controls<IAcademicYear>(
            this.initialValues
        ); //  Step 5
        this.AcademicYearForm.setValidators(
            FormHandler.validate<IAcademicYear>(this.validationSchema)
        );
    }

    ngOnInit() {
        this.LoadApplication();
        this.GetAll();
    }

    public LoadApplication() {
        try {
            this.httpService
                .globalGet(
                    FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ACADEMIC_YEAR.LIST
                )
                .subscribe({
                    next: (result: any) => {
                        // this.AcadamicYearList = result.applications;
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        } catch (error) {}
    }

    onChangeApplicationName($event: any) {
        console.log($event);
    }

    categories: any[] = [
        { name: 'Yes', key: '1' },
        { name: 'No', key: '0' },
    ];

    public GetAll() {
        this.productService.getAcademicYears().then((data) => {
            this.items = data;
        });

        // try {
        //   this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ACADEMIC_YEAR.LIST)
        //     .subscribe({
        //       next: (result: any) => {
        //         // doubt
        //         this.items = result.academicYear;
        //         console.log('GetAll', this.items);

        //       },
        //       error: (err: HttpErrorResponse) => console.log(err)

        //     });
        // } catch (error) {

        // }
    }

    Save() {
        console.log(this.AcademicYearForm.value);

        let _apiUrl: string = '';
        let passSaveParams: any = {};

        try {
            if (this.IsUpdate) {
                //  UPDATE


                passSaveParams.academicYearId = this.AcadamicYearId;

                passSaveParams.startDate =
                    this.AcademicYearForm.value['startDate'];
                passSaveParams.endDate = this.AcademicYearForm.value['endDate'];
                passSaveParams.academicYear =
                    this.AcademicYearForm.value['academicYear'];
                passSaveParams.accountYear =
                    this.AcademicYearForm.value['accountYear'];

                passSaveParams.isActive = true;
                passSaveParams.userId = this.userDetails ? this.userDetails.userId : 0;
                passSaveParams.ipAddress = '192.168.1.1';

                _apiUrl =
                    FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ACADEMIC_YEAR
                        .UPDATE;
            } else {
                //  SAVE

                //console.log(this.AcademicYearForm.value);

                passSaveParams.academicYearId = 0;
                passSaveParams.startDate =
                    this.AcademicYearForm.value['startDate'];
                passSaveParams.endDate = this.AcademicYearForm.value['endDate'];
                passSaveParams.academicYear =
                    this.AcademicYearForm.value['academicYear'];
                passSaveParams.accountYear =
                    this.AcademicYearForm.value['accountYear'];

                passSaveParams.isActive = true;
                passSaveParams.userId = this.userDetails
                    ? this.userDetails.id
                    : 0;
                passSaveParams.ipAddress = '192.168.1.1';

                _apiUrl =
                    FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ACADEMIC_YEAR
                        .SAVE;
            }

            console.log('Before SAVE',passSaveParams)

            this.httpService
                .globalPost('', JSON.stringify(passSaveParams))
                .subscribe({
                    next: (result: any) => {
                        this.Clear;
                        this.notificationsService(
                            FiscalValidation.NOTIFICATION_SUCCESS,
                            ' Success Message ',
                            result.message
                        );
                    },
                    error: (err: HttpErrorResponse) => {
                        console.log(err);
                    },
                });
        } catch (error) {}
    }

    Clear() {
        this.buttonText = 'Save';
        this.IsUpdate = false;
        this.AcademicYearForm.reset();
        this.GetAll();    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    Edit(item: any) {


        console.log('Edit', item);

        this.AcadamicYearId=item.academicYearId;

        this.AcademicYearForm.controls['startDate']?.setValue(item.startDate);
        this.AcademicYearForm.controls['endDate']?.setValue(item.endDate);
        this.AcademicYearForm.controls['academicYear']?.setValue([new Date(item.academicYear[0]),new Date(item.academicYear[1])]);
        this.AcademicYearForm.controls['accountYear']?.setValue(new Date(item.accountYear));
        this.AcademicYearForm.controls['isDefault']?.setValue(this.categories.find(x=>x.key == item.isDefault));

        this.IsUpdate = true;
        this.buttonText = 'Update';
    }

    Delete(data: any) {
        this.deleteDialog = true;
        this.item = { ...data };
    }

    confirmDelete() {
        this.deleteDialog = false;
        let deletedItem: any[] = this.items.filter(
            (val) => val.academicYearId === this.item.academicYearId
        );

        console.log('deletedItem', deletedItem);
        if (deletedItem != null && deletedItem.length > 0) {
            var passSaveParams: any = {};
            passSaveParams.academicYearId = deletedItem[0].academicYearId;
            passSaveParams.academicYear = deletedItem[0].academicYear;
            passSaveParams.startDate = deletedItem[0].startDate;
            passSaveParams.endDate = deletedItem[0].endDate;
            passSaveParams.accountYear = deletedItem[0].academicYear;
            // doubt
            passSaveParams.isDefault = true;
            passSaveParams.isActive = false;
            passSaveParams.userId = this.userDetails
                ? this.userDetails.userId
                : 0;
            passSaveParams.ipAddress = '192.168.1.1';

            console.log(passSaveParams);

            this.httpService
                .globalPost(
                    FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ACADEMIC_YEAR
                        .DELETE,
                    JSON.stringify(passSaveParams)
                )
                .subscribe({
                    next: (result: any) => {
                        this.Clear();
                        this.notificationsService(
                            FiscalValidation.NOTIFICATION_SUCCESS,
                            'success Message',
                            result.message
                        );
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        }

        this.item = {};
    }

    private notificationsService(_severity: any, _summary: any, _message: any) {
        this.messageService.add({
            severity: _severity,
            summary: _summary,
            detail: _message,
            life: 3000,
        });
        return;
    }
}

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Table } from 'primeng/table';

import { CustomerService } from 'src/app/demo/service/customer.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { IMisc, IMiscDetails } from 'src/app/shared/interface/IMisc';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminValidation } from 'src/app/+admin/services/admin-validation';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

@Component({
    selector: 'app-misc-detail',
    templateUrl: './misc-detail.component.html',
    styleUrls: ['./misc-detail.component.scss'],
})
export class MiscDetailComponent {

    //#region Misc Name Autocomplete
    filteredMiscList: IMiscDetails[] = [];
    miscItems: IMiscDetails[] = []; //  Load : Misc items array
    //#endregion


    filteredMiscDetailList: IMiscDetails[] = [];
    miscDtlItems: IMiscDetails[] = []; //  Load : Misc Detail items array
    // Delete
    private DeletedMiscDtls: IMiscDetails[] = [];



    item: IMiscDetails = {};
    cols: any[] = [];
    // miscdetails: IMiscDetails[] = [];

    // filteredItems: IMiscDetails[] = [];
    // selectedItems: IMiscDetails[] = [];

    public buttonText: string = 'Save';
    public IsUpdate: boolean = false;
    public miscId: number | undefined | null = 0;
    public userDetails: any;
    autocomplete: any;
    private isValidation: boolean = true;
    private ValidationMsg: string = '';


    MiscDetailForm: FormGroup<YupFormControls<IMiscDetails>>;


    formError = (controlName: string, formName: any) => {
        return this.utilService.formError(controlName, formName);
    };


    initialValues: IMiscDetails = {
        miscDtlId: null,
        miscId: null,
        miscDtlName: null,
        selectedMiscName: null,
        miscDtlDesc: null,

        userId: null,
        unitId: null,
        isActive: null,
        ipAddress: null,
    };


    constructor(
        private utilService: UtilService,
        private messageService: MessageService,
        private httpService: CommonHttpService
    ) {
        this.MiscDetailForm = FormHandler.controls<IMiscDetails>(this.initialValues);
    }

    // step 1
    public GetAllMiscs() {
        try {
            this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.LIST + '?keyWord=Fiscal')
                .subscribe({
                    next: (result: any) => {
                        this.miscItems = result.miscs;
                        this.filteredMiscList = this.miscItems;
                        console.log('GetAllMiscs', this.filteredMiscList);
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        } catch (error) { }
    }


    public GetAllMiscDetails() {
        try {
            this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.DETAILS + '?keyWord=Fiscal')
                .subscribe({
                    next: (result: any) => {
                        this.miscDtlItems = result.miscDtls;
                        this.filteredMiscDetailList = this.miscDtlItems;
                        console.log('GetAllMiscDetails', this.filteredMiscDetailList);
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        } catch (error) { }
    }

    ngOnInit() {
        this.GetAllMiscs();
        this.GetAllMiscDetails();
    }

    // step 2
    filterMisc(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < (this.miscItems as any[]).length; i++) {
            let misc = (this.miscItems as any[])[i];

            if (misc.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(misc);
            }
        }

        this.filteredMiscList = filtered;
    }

    // step 3
    Clear() {
        this.IsUpdate = false;
        this.MiscDetailForm.reset();
        this.filteredMiscDetailList = [];
        this.GetAllMiscs();
        this.GetAllMiscDetails();
    }

    // step 4

    onGlobalFilter(table: Table, event: Event) { table.filterGlobal((event.target as HTMLInputElement).value, 'contains'); }


    // step 5

    onSelectMiscName() {
        console.log(this.MiscDetailForm.controls['selectedMiscName']);

        if (this.MiscDetailForm.controls['selectedMiscName'] != null) {
            this.filteredMiscDetailList = _.filter(this.miscDtlItems, (val) => {
                return (
                    val.miscId == this.MiscDetailForm.controls['selectedMiscName']?.value.miscId);
            });
        }
    }



    clearItem(autocomplete: any) {
        autocomplete.value = '';
        autocomplete.handleDropdownClick();
    }


    private notificationsService(_severity: any, _summary: any, _message: any) {
        this.messageService.add({
            severity: _severity, summary: _summary, detail: _message, life: 3000,
        });
        return;
    }

    Save() {

        try {

            let _apiUrl: string = '';
            let passSaveParams: any = {};
            passSaveParams.miscDtlList = {};
            passSaveParams.miscDtlList.miscDtl = [];

            this.isValidation = true;
            this.ValidationMsg = '';


            let _miscDtlName: any[] = [];
            _miscDtlName = _.filter(this.filteredMiscDetailList, (va) => {
                return va.miscDtlName == '';
            });

            if (this.MiscDetailForm.value['selectedMiscName'] == undefined ||
                _.isEmpty(this.MiscDetailForm.value['selectedMiscName'].name) ||
                this.MiscDetailForm.value['selectedMiscName'] == null
            ) {
                this.isValidation = false;
                this.ValidationMsg = 'Please Select Type.';
            }
            else if (_miscDtlName.length != 0) {
                this.isValidation = false;
                this.ValidationMsg = 'Please Enter Misc Detail Name.';
            }

            if (this.isValidation) {

                _.each(this.filteredMiscDetailList, va => { //  Add / Update
                    va.isActive = true;
                    passSaveParams.miscDtlList.miscDtl.push(va);
                });

                _.each(this.DeletedMiscDtls, va => {    //  Delete
                    va.isActive = false;
                    passSaveParams.miscDtlList.miscDtl.push(va);
                });

                passSaveParams.miscDtlList.keyWord = 'Fiscal';
                passSaveParams.miscDtlList.userId = this.userDetails ? this.userDetails.userId : 0;
                passSaveParams.miscDtlList.ipAddress = '192.168.1.1';

                _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.CREATE_UPDATE_DELETE;

                console.log('Before save misc-details', JSON.stringify(passSaveParams));

                this.httpService
                    .globalPost(_apiUrl, JSON.stringify(passSaveParams))
                    .subscribe({
                        next: (result: any) => {
                            this.notificationsService(
                                AdminValidation.NOTIFICATION_SUCCESS,
                                'Success Message',
                                result.message
                            );
                            this.Clear();
                        },
                        error: (err: HttpErrorResponse) => console.log(err),
                    });
            }
            else {
                this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation Message', this.ValidationMsg);
            }

        } catch (error) { }
    }

    public AddRows() {


        if (this.MiscDetailForm.value['selectedMiscName'] != null) {

            try {

                let _miscDtlName: any[] = [];
                _miscDtlName = _.filter(this.filteredMiscDetailList, (va) => {
                    return va.miscDtlName == '';
                });

                this.isValidation = true;
                this.ValidationMsg = '';

                if (_miscDtlName.length != 0) {
                    this.isValidation = false;
                    this.ValidationMsg = 'Please Enter Misc Detail Name.';
                }

                if (this.isValidation) {
                    let dataBind: any = {};
                    dataBind.miscDtlId = 0;
                    dataBind.miscId = this.MiscDetailForm.value['selectedMiscName'] != null ? this.MiscDetailForm.value['selectedMiscName'].miscId : 0;
                    dataBind.miscName = "";
                    dataBind.miscDtlName = ''; // Detail Name
                    dataBind.miscDtlDesc = ''; // Detail Description
                    dataBind.isActive = true;
                    dataBind.edit = true;
                    this.filteredMiscDetailList.push(dataBind);
                } else {
                    this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation Message', this.ValidationMsg);
                }
            } catch (error) {
                alert(error);
            }
        } else {
            this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation Message', 'Please Select Misc Name.');
        }
    }

    RemoveRows(data: any, index: number) {
        try {
            if (+(data.miscDtlId) != 0) {
                this.DeletedMiscDtls.push(data);
            }

            this.filteredMiscDetailList.splice(index, 1);
            this.filteredMiscDetailList = [...this.filteredMiscDetailList];

        } catch (error) {
            alert(error);
        }
    }

    EnableEdit(data: any, index: number) {
        this.IsUpdate = true;
        this.buttonText = "Update";
    }

    Edit(item: any) {
        this.IsUpdate = true;
        this.buttonText = "Update";
    }








}

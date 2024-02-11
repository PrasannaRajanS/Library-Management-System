import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Table } from 'primeng/table';

import { CustomerService } from 'src/app/demo/service/customer.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { IMisc, IMiscDetails } from 'src/app/shared/interface/IMisc';
import { HttpService } from 'src/app/+fiscal/services/http.service';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminValidation } from 'src/app/+admin/services/admin-validation';

@Component({
    selector: 'app-misc-detail',
    templateUrl: './misc-detail.component.html',
    styleUrls: ['./misc-detail.component.scss'],
})
export class MiscDetailComponent {
    //#region Misc Name Autocomplete
    selectedMiscName: IMisc = {}; //  to get the seletected value
    filteredMiscList: IMisc[] = []; //  List of items array
    MiscList: IMisc[] = []; //  List of items array
    //#endregion



    miscdetails: IMiscDetails[] = [];
    cols: any[] = [];
    items: IMisc[] = [];
    // item:IMiscDetails={};

    selectedItems: IMiscDetails[] = [];

    public buttonText: string = 'Save';

    public IsUpdate: boolean = false;

    public miscId: number | undefined | null = 0;

    public userDetails: any;


    // delete
    private DeleteTypeDtls: Array<any> = [];
    public TypeDtlLists = [];


    MiscDetailForm: FormGroup<YupFormControls<IMiscDetails>>;

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

    autocomplete: any;

    private isValidation: boolean = true;
    private ValidationMsg: string = '';

    constructor(
        private router: Router,
        private customerService: CustomerService,
        private utilService: UtilService,
        private messageService: MessageService,
        private httpService: HttpService
    ) {
        this.MiscDetailForm = FormHandler.controls<IMiscDetails>(
            this.initialValues
        );
    }

    clearItem(autocomplete: any) {
        autocomplete.value = '';
        autocomplete.handleDropdownClick();
    }
    ngOnInit() {
        // this.customerService.getMiscDetailcLarge().then(miscdetails => this.miscdetails=miscdetails)
        this.GetAll();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    navigateToCreateUser() {
        this.router.navigate(['/apps/fiscal/misc']);
    }
    formError = (controlName: string, formName: any) => {
        return this.utilService.formError(controlName, formName);
    };

    Save() {
        try {
            let _apiUrl: string = '';
            let passSaveParams: any = {};

            // Update
            if (this.IsUpdate) {
                passSaveParams.miscDtlList = {};
                passSaveParams.miscDtlList.miscDtl = this.miscdetails;
                passSaveParams.miscDtlList.userId = this.userDetails
                    ? this.userDetails.userId
                    : 0;
                passSaveParams.miscDtlList.ipAddress = '192.168.1.1';

                _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.UPDATE;
            }

            // Save
            else {
                passSaveParams.miscDtlList = {};
                passSaveParams.miscDtlList.miscDtl = this.miscdetails;
                passSaveParams.miscDtlList.userId = this.userDetails
                    ? this.userDetails.userId
                    : 0;
                passSaveParams.miscDtlList.ipAddress = '192.168.1.1';

                _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.CREATE;
            }

            console.log('Before save misc-details', passSaveParams);

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
        } catch (error) {}
    }

    public AddRows() {
        console.log(
            'this.selectedMiscName ',
            this.MiscDetailForm.value['selectedMiscName']
        );

        if (this.MiscDetailForm.value['selectedMiscName'] != null) {
            try {
                let _miscDtlName: any[] = [];
                _miscDtlName = _.filter(this.miscdetails, (va) => {
                    return va.miscDtlName == '';
                });

                this.isValidation = true;
                this.ValidationMsg = '';

                if (
                    this.MiscDetailForm.value['selectedMiscName'] ==  undefined ||
                    _.isEmpty(this.MiscDetailForm.value['selectedMiscName'].name) ||
                    this.MiscDetailForm.value['selectedMiscName'] == null
                ) {
                    this.isValidation = false;
                    this.ValidationMsg = 'Please Select Type.';
                } else if (_miscDtlName.length != 0) {
                    this.isValidation = false;
                    this.ValidationMsg = 'Please Enter Description.';
                }

                if (this.isValidation) {

                    let dataBind: any = {};
                    dataBind.miscDtlId = 0;
                    dataBind.miscId =  this.MiscDetailForm.value['selectedMiscName'] != null
                            ? this.MiscDetailForm.value['selectedMiscName'].miscId : 0;
                    dataBind.miscDtlName = ''; // Detail Name
                    dataBind.miscDtlDesc = ''; // Detail Description
                    dataBind.isActive = true;
                    dataBind.edit = true;
                    this.miscdetails.push(dataBind);

                } else {

                  this.notificationsService(
                      FiscalValidation.NOTIFICATION_VALIDATION,
                      'Validation Message',
                      this.ValidationMsg
                  );

                }
            } catch (error) {
                alert(error);
            }

        } else {
            this.notificationsService(
                FiscalValidation.NOTIFICATION_VALIDATION,
                'Validation Message',
                'Please Select Misc Name'
            );
        }
    }

    RemoveRows(data: any, index: number)
     {
        try {
                    if(+(data.miscDtlId)!=0){
                        this.DeleteTypeDtls.push(data);
                    }
                    this.TypeDtlLists.splice(index,1);
                    this.TypeDtlLists=[...this.TypeDtlLists]
        } catch (error) {
            alert(error);
        }
    }


    EnableEdit(data: any, index: number) {}
    Edit(item: any) {}
    Delete() {}

    public GetAll() {
        try {
            this.httpService
                .globalGet(
                    FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.LIST +
                        '?keyWord=Fiscal'
                )
                .subscribe({
                    next: (result: any) => {
                        this.items = result.miscs;
                        console.log('GetAll', this.items);
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        } catch (error) {}
    }

    filterMisc(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < (this.items as any[]).length; i++) {
            let misc = (this.items as any[])[i];

            if (misc.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(misc);
            }
        }

        this.filteredMiscList = filtered;
    }

    Clear() {
        this.MiscDetailForm.reset();
        this.miscdetails = [];
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

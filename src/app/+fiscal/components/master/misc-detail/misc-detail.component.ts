import { Component } from '@angular/core';
import {  FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-misc-detail',
  templateUrl: './misc-detail.component.html',
  styleUrls: ['./misc-detail.component.scss']
})
export class MiscDetailComponent {

  //#region Misc Name Autocomplete
  selectedMiscName: IMisc = {}; //  to get the seletected value
  filteredMiscList: IMisc[] = []; //  List of items array
  MiscList: IMisc[] = []; //  List of items array
  //#endregion



  miscdetails: IMiscDetails[] = [];
  cols: any[] = [];
  items:IMisc[]=[];
  // item:IMiscDetails={};

  selectedItems: IMiscDetails[] = [];

  public buttonText: string = "Save"

  MiscDetailForm: FormGroup<YupFormControls<IMiscDetails>>;

  initialValues: IMiscDetails = {
    miscDtlId: null,
    miscId: null,
    miscName: null,
    selectedMiscName: null,
    MiscDtlDescription: null,

    userId: null,
    unitId: null,
    isActive: null,
    ipAddress: null
  }

  autocomplete: any;

  private isValidation: boolean = true;
  private ValidationMsg: string = "";

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private utilService: UtilService,
    private messageService: MessageService,
    private httpService :HttpService
  ) {
    this.MiscDetailForm = FormHandler.controls<IMiscDetails>(this.initialValues);


    
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
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
  navigateToCreateUser() {
    this.router.navigate(['/apps/fiscal/misc'])
  }
  formError = (controlName: string, formName: any) => {
    return this.utilService.formError(controlName, formName)
  };




  Save() {

  }



  public AddRows() {

    console.log('this.selectedMiscName ', this.MiscDetailForm.value['selectedMiscName'])

    if (this.MiscDetailForm.value['selectedMiscName'] != null) {

      try {

        let Description: any[] = [];
        Description = _.filter(this.miscdetails, va => {
          return va.MiscDtlDescription == "";
        });

        this.isValidation = true;
        this.ValidationMsg = "";

        if (this.MiscDetailForm.value['selectedMiscName'] == undefined || _.isEmpty(this.MiscDetailForm.value['selectedMiscName'].name)) {
          this.isValidation = false;
          this.ValidationMsg = "Please Select Type.";
        }
        else if (Description.length != 0) {
          this.isValidation = false;
          this.ValidationMsg = "Please Enter Description.";
        }

        if (this.isValidation) {

          let dataBind: any = {};
          dataBind.miscDtlId = 0;
          dataBind.miscId = this.MiscDetailForm.value['selectedMiscName'].miscId;
          dataBind.MiscDtlDescription = "";

          dataBind.edit = true;
          dataBind.UserId = 0;
          dataBind.UnitId = 0;
          dataBind.IsActive = 1;
          this.miscdetails.push(dataBind);

        } else {

        }


      } catch (error) {
        alert(error)
      }
    }
    else {
      this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation Message', "Please select Misc Name");
    }


  }

  RemoveRows(data: any, index: number) {

  }
  EnableEdit(data: any, index: number) {

  }
  Edit(item: any) {

  }
  Delete() {

  }

  public GetAll() {
    try {
        this.httpService
            .globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.LIST+'?keyWord=Fiscal')
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
    this.miscdetails=[];     

  }


  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Table } from 'primeng/table';
import { IMisc, IMiscDetails } from 'src/app/+fiscal/services/interfaces/IMisc';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';

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
  ) {
    this.MiscDetailForm = FormHandler.controls<IMiscDetails>(this.initialValues);


    this.MiscList = [
      {
        "miscId": 1,
        "name": "Blood Group",
        "description": ""
      },
      {
        "miscId": 2,
        "name": "Gender",
        "description": ""
      },
      {
        "miscId": 3,
        "name": "Cuddalore",
        "description": "the First see port in tamilnadu"
      }

    ];
  }

  clearItem(autocomplete: any) {
    autocomplete.value = '';
    autocomplete.handleDropdownClick();
  }
  ngOnInit() {
    // this.customerService.getMiscDetailcLarge().then(miscdetails => this.miscdetails=miscdetails)
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


  Clear() {

  }

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

  filterMisc(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.MiscList as any[]).length; i++) {

      let misc = (this.MiscList as any[])[i];

      if (misc.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(misc);
      }
    }

    this.filteredMiscList = filtered;

  }

  //   filterCountry(event: AutoCompleteCompleteEvent) {
  //     let filtered: any[] = [];
  //     let query = event.query;

  //     for (let i = 0; i < (this.countries as any[]).length; i++) {
  //         let country = (this.countries as any[])[i];
  //         if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //             filtered.push(country);
  //         }
  //     }

  //     this.filteredCountries = filtered;
  // }


  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }
}

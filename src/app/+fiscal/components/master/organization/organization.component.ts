import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import * as _ from 'lodash';

import { IOrganization } from 'src/app/+fiscal/services/interfaces/IOrganization';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';

import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import * as yup from 'yup';

import { UtilService } from 'src/app/shared/util.service';

import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { APIConfig } from 'src/app/config/api.config';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { IState } from 'src/app/shared/interface/IState';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {

  OrganizationId: number | null | undefined = 0;
  OrganizationList: IOrganization[] = [];


  public buttonText: string = "Save";
  public userDetails: any;

  private IsUpdate: boolean = false;

  myFiles: string[] = [];

  selectedItems: IOrganization[] = [];
  item: IOrganization = {};
  items: IOrganization[] = [];

  CoutryList: ICountry[] = [];
  filteredCoutryList: ICountry[] = [];

  StateList: IState[] = [];
  filteredStateList: IState[] = [];

  public ImagePath: string | undefined = "";

  logoURL: any;
  iconURL: any;




  // public OrganizationId

  //#region UI Validation Declarations
  OrganizationForm: FormGroup<YupFormControls<IOrganization>>; //  Step 1

  //  Step 2
  initialValues: IOrganization = {  
    organizationId: 0,
    name: null,
    shortName: null,
    address1: null,
    address2: null,
    address3: null,
    address4: null,
    city: null,

     stateId: null,
    // stateName: null,
    selectedState: null,

     countryId: null,
    // countryName: null,
    selectedCountry: null,

    pinCode: null,
    phoneNumber: null,
    fax: null,
    mobileNumber: null,
    email: null,
    website: null,

    isActive: null,
    userId: null,
    ipAddress: null
  };

  validationSchema: yup.ObjectSchema<IOrganization> = YupFiscalValidation.ORGANIZATION; //  Step 3

  //  Step 4
  formError = (controlName: string, formName: any) => { 
    return this.utilService.formError(controlName, formName);
  };
  //#endregion


  constructor(
    private utilService: UtilService,
    private httpService: CommonHttpService,
    private messageService: MessageService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.OrganizationForm = FormHandler.controls<IOrganization>(this.initialValues); //  Step 5
    this.OrganizationForm.setValidators(FormHandler.validate<IOrganization>(this.validationSchema));

    //#region 
    this.activatedRoute.params.subscribe((params: any) => {

      if (params != undefined && !_.isEmpty(params)) {
        this.OrganizationId = (+(params.id));
        this.buttonText = "Update";
        this.IsUpdate = true;

        

      } else {
        this.OrganizationId = 0;
        this.IsUpdate = false;
      }
    });
    //#endregion

    
  }

  ngOnInit() {
    this.GetCountries();
    this.GetStates();

    if (this.OrganizationId != undefined && this.OrganizationId != 0) {
      this.fnGetOrganizationById(); //  Get Organization Detail based on Id
    }

  }

  
  public GetCountries() {

    try {

      this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_COUNTRIES)
        .subscribe({
          next: (result: any) => {
            this.CoutryList = result.countries;
            console.log('GetCountries', this.CoutryList);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }

  public GetStates() {

    try {

      this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_STATES)
        .subscribe({
          next: (result: any) => {
            this.StateList = result.states;
            console.log('GetStates', this.StateList);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }

  //  list button

  RedirecttoList() {
    this.router.navigate(['/apps/fiscal/organization-list']);
  }




  getOrganizationLogo($event: any) {

    if ($event.length === 0) {
      return;
    }
    for (var i = 0; i < $event.target.files.length; i++) {
      var mimeType = $event.target.files[i].type;
      if (mimeType.match(/image\/*/) == null) {
        this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation', "Only images are supported.")
        return;

      }

      // #endRegion
      this.myFiles.push($event.target.files[i]);

    }
    this.ImagePath = $event.target.files;
    //#region PREVIEW IMAGE

    var reader = new FileReader();
    this.ImagePath = $event.target.files;
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (_event) => {
      this.logoURL = reader.result;
    }
  }


  getFavicon($event: any) {

    if ($event.length === 0) {
      return;
    }
    for (var i = 0; i < $event.target.files.length; i++) {
      var mimeType = $event.target.files[i].type;
      if (mimeType.match(/image\/*/) == null) {
        this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation', "Only images are supported.")
        return;

      }

      // #endRegion
      this.myFiles.push($event.target.files[i]);

    }
    this.ImagePath = $event.target.files;
    //#region PREVIEW IMAGE

    var reader = new FileReader();
    this.ImagePath = $event.target.files;
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (_event) => {

      this.iconURL = reader.result;
    }
  }


  Save() {

    try {

      let _apiUrl: string = '';
      let passSaveParams: any = {};
      console.log('Save()', this.OrganizationForm);

      if (this.IsUpdate) { //  UPDATE

        passSaveParams.organizationId = this.OrganizationId;
        passSaveParams.name = this.OrganizationForm.value['name'];
        passSaveParams.shortName = this.OrganizationForm.value['shortName'];
        passSaveParams.address1 = this.OrganizationForm.value['address1'] != null ? this.OrganizationForm.value['address1'] : '';
        passSaveParams.address2 = this.OrganizationForm.value['address2'] != null ? this.OrganizationForm.value['address2'] : '';
        passSaveParams.address3 = this.OrganizationForm.value['address3'] != null ? this.OrganizationForm.value['address3'] : '';
        passSaveParams.address4 = this.OrganizationForm.value['address4'] != null ? this.OrganizationForm.value['address4'] : '';
        passSaveParams.city = this.OrganizationForm.value['city'] != null ? this.OrganizationForm.value['city'] : '';
        passSaveParams.stateId = this.OrganizationForm.value['selectedState'] != null ? this.OrganizationForm.value['selectedState'].stateId : 0;
        passSaveParams.countryId = this.OrganizationForm.value['selectedCountry'] != null ? this.OrganizationForm.value['selectedCountry'].countryId : 0;
        passSaveParams.pinCode = this.OrganizationForm.value['pinCode'] != null ? +(this.OrganizationForm.value['pinCode']) : 0;
        passSaveParams.phoneNumber = this.OrganizationForm.value['phoneNumber'] != null ? this.OrganizationForm.value['phoneNumber'] : '';
        passSaveParams.fax = this.OrganizationForm.value['fax'] != null ? this.OrganizationForm.value['fax'] : '';
        passSaveParams.mobileNumber = this.OrganizationForm.value['mobileNumber'] != null ? this.OrganizationForm.value['mobileNumber'] : '';
        passSaveParams.email = this.OrganizationForm.value['email'] != null ? this.OrganizationForm.value['email'] : '';
        passSaveParams.website = this.OrganizationForm.value['website'] != null ? this.OrganizationForm.value['website'] : '';
        passSaveParams.logoURL = '';
        passSaveParams.iconURL = '';

        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ORGANIZATION.UPDATE


      }
      else { //  SAVE

        passSaveParams.organizationId = this.OrganizationId;
        passSaveParams.name = this.OrganizationForm.value['name'];
        passSaveParams.shortName = this.OrganizationForm.value['shortName'];
        passSaveParams.address1 = this.OrganizationForm.value['address1'] != null ? this.OrganizationForm.value['address1'] : '';
        passSaveParams.address2 = this.OrganizationForm.value['address2'] != null ? this.OrganizationForm.value['address2'] : '';
        passSaveParams.address3 = this.OrganizationForm.value['address3'] != null ? this.OrganizationForm.value['address3'] : '';
        passSaveParams.address4 = this.OrganizationForm.value['address4'] != null ? this.OrganizationForm.value['address4'] : '';
        passSaveParams.city = this.OrganizationForm.value['city'] != null ? this.OrganizationForm.value['city'] : '';
        passSaveParams.stateId = this.OrganizationForm.value['selectedState'] != null ? this.OrganizationForm.value['selectedState'].stateId : 0;
        passSaveParams.countryId = this.OrganizationForm.value['selectedCountry'] != null ? this.OrganizationForm.value['selectedCountry'].countryId : 0;
        passSaveParams.pinCode = this.OrganizationForm.value['pinCode'] != null ? +(this.OrganizationForm.value['pinCode']) : 0;
        passSaveParams.phoneNumber = this.OrganizationForm.value['phoneNumber'] != null ? this.OrganizationForm.value['phoneNumber'] : '';
        passSaveParams.fax = this.OrganizationForm.value['fax'] != null ? this.OrganizationForm.value['fax'] : '';
        passSaveParams.mobileNumber = this.OrganizationForm.value['mobileNumber'] != null ? this.OrganizationForm.value['mobileNumber'] : '';
        passSaveParams.email = this.OrganizationForm.value['email'] != null ? this.OrganizationForm.value['email'] : '';
        passSaveParams.website = this.OrganizationForm.value['website'] != null ? this.OrganizationForm.value['website'] : '';
        passSaveParams.logoURL = '';
        passSaveParams.iconURL = '';

        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ORGANIZATION.SAVE

        console.log(passSaveParams);

      }

      console.log("Save / Update Click", JSON.stringify(passSaveParams));

      this.httpService.globalPost(_apiUrl, JSON.stringify(passSaveParams))
        .subscribe({
          next: (result: any) => {
            this.notificationsService(FiscalValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message)
            this.Clear()
          },
          error: (err: HttpErrorResponse) => console.log(err)


        })


    } catch (error) {

    }
  }

  Clear() {
    this.buttonText = "Save";
    this.IsUpdate = false;
    this.OrganizationForm.reset();
  }


  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  public fnGetOrganizationById() {

    try {
      this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ORGANIZATION.EDIT + '/?organizationId=' + this.OrganizationId)
        .subscribe({
          next: (result: any) => {
            this.OrganizationList = result.organizations;
            console.log('fnGetOrganizationById', this.OrganizationList);

            if (this.OrganizationList != undefined && this.OrganizationList.length > 0) {

              this.OrganizationId = this.OrganizationList[0].organizationId;
              this.OrganizationForm.controls['name']?.setValue(this.OrganizationList[0].name);
              this.OrganizationForm.controls['shortName']?.setValue(this.OrganizationList[0].shortName);
              this.OrganizationForm.controls['address1']?.setValue(this.OrganizationList[0].address1);
              this.OrganizationForm.controls['address2']?.setValue(this.OrganizationList[0].address2);
              this.OrganizationForm.controls['address3']?.setValue(this.OrganizationList[0].address3);
              this.OrganizationForm.controls['address4']?.setValue(this.OrganizationList[0].address4);
              this.OrganizationForm.controls['city']?.setValue(this.OrganizationList[0].city);
              this.OrganizationForm.get("selectedState")?.setValue(this.StateList.find(app => app.stateId === this.OrganizationList[0].stateId));
              this.OrganizationForm.get("selectedCountry")?.setValue(this.CoutryList.find(app => app.countryId === this.OrganizationList[0].countryId));
              this.OrganizationForm.controls['pinCode']?.setValue(this.OrganizationList[0].pinCode);
              this.OrganizationForm.controls['phoneNumber']?.setValue(this.OrganizationList[0].phoneNumber);
              this.OrganizationForm.controls['fax']?.setValue(this.OrganizationList[0].fax);
              this.OrganizationForm.controls['mobileNumber']?.setValue(this.OrganizationList[0].mobileNumber);
              this.OrganizationForm.controls['email']?.setValue(this.OrganizationList[0].email);
              this.OrganizationForm.controls['website']?.setValue(this.OrganizationList[0].website);
          
              this.IsUpdate = true
              this.buttonText = "Update"

            }

          },
          error: (err: HttpErrorResponse) => console.log('fnGetOrganizationById', err)

        })
    } catch (error) {

    }

  }

  
  filterCountry(event: AutoCompleteCompleteEvent) {

    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.CoutryList as any[]).length; i++) {
      let _countriesList = (this.CoutryList as any[])[i];
      if (_countriesList.countryName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_countriesList);
      }
    }
    this.filteredCoutryList = filtered;
  }

  filterState(event: AutoCompleteCompleteEvent) {

    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.StateList as any[]).length; i++) {
      let _stateList = (this.StateList as any[])[i];
      if (_stateList.stateName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_stateList);
      }
    }
    this.filteredStateList = filtered;
  }

  onSelectState() {
    if (this.OrganizationForm.value['selectedState'] != undefined && this.OrganizationForm.value['selectedState'] != null) {
      let _countryId: number = this.OrganizationForm.value['selectedState'].countryId;
      this.OrganizationForm.get("selectedCountry")?.setValue(this.CoutryList.find(c => c.countryId === _countryId));
    }
    else {
      this.OrganizationForm.get("selectedCountry")?.setValue(null);
    }
  }

  onClearState() {
    console.log('onClearState',this.OrganizationForm)
    this.OrganizationForm.get("selectedCountry")?.reset();
  }

 
}

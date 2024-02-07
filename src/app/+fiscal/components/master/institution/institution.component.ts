import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';

import { IInstitution } from 'src/app/+fiscal/services/interfaces/IInstitution';

import { UtilService } from 'src/app/shared/util.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/+admin/services/http.service';

import * as yup from "yup";
import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { IState } from 'src/app/+fiscal/services/interfaces/IState';
import { IOrganization } from 'src/app/+fiscal/services/interfaces/IOrganization';
import { ILabel, IMedium, ISchoolCategory, ISchoolType } from 'src/app/+fiscal/services/interfaces/ICommon';
import { AppConstant } from 'src/app/config/app.contant';
import { ICountry } from 'src/app/+fiscal/services/interfaces/ICountry';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { APIConfig } from 'src/app/config/api.config';


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {

  StateList: IState[] = [];
  filteredStateList: IState[] = []

  OrganizationList: IOrganization[] = [];
  SchoolCategoryList: ISchoolCategory[] = [];
  SchoolTypeList: ISchoolType[] = [];
  MediumList: IMedium[] = [];

  PrePrimaryList: any = [];

  OrganizationId: number = 0;
  InstitutionId: any = 0;


  public buttonText: string = "Save";
  myFiles: string[] = [];

  selectedItems: IInstitution[] = [];
  item: IInstitution = {};
  items: IInstitution[] = []
  InstitutionList: IInstitution[] = [];

  CoutryList: ICountry[] = [];
  filteredCoutryList: ICountry[] = [];

  


  public userDetails: any;

  private IsUpdate: boolean = true;

  // 1.

  //#region UI Validation Declarations

  //  Step 1
  InstitutionFrom: FormGroup<YupFormControls<IInstitution>>;

  //  Step 2
  initialValues: IInstitution = {
    institutionId: 0,
    institutionName: null,
    organizationId: 0,
    selectedOrganization: null,
    shortName: null,
    UDISECode: null,

    stateId:null,
    selectedState: null,
    district: null,
    block: null,
    cluster: null,
    ward:null,
    mohalla:null,
    pincode:null,
    panchayat:null,
    municipality:null,

    categoryId:null,
    selectedCategory:null,
    stateManagement:null,
    nationalManagement:null,
    schoolTypeId:null,
    selectedschoolType:null,
    classFrom:null,
    classTo:null,
    selectedPrePrimary:null,
    selectedMedium:null,
    
    // Address Info
    address1: null,
    address2: null,
    address3: null,
    address4: null,
    city: null,
    addressStateId: null,
    countryId: null,
    selectedCountry:null,
    pinCode: null,
    fax: null,
    mobileNumber1: null,
    mobileNumber2: null,
    phoneNumber1: null,
    phoneNumber2: null,
    primaryEmail: null,
    secondaryEmail: null,
    website: null,

    // // Basic Info

    // basicStateId: null,
    // basicDistrictId: null,
    // basicCityId: null,
    // basicLocation: null,
    // basicPincode: null,
    // basicMunicipality: null,
    // basicBlock: null,
    // basicWard: null,
    // basicPanchayat: null,
    // basicMohalla: null,
    // basicCluster: null,
    // basicSchoolType: null,
    // basicSchoolCategory: null,
    // basicSchoolManagement: null,
    // basicClassFrom: null,
    // basicClassTo: null,
    // basicMedium1: null,
    // basicMedium2: null,
    // basicMedium3: null,
    // basicMedium4: null,
    // basicPrePrimary: null,

    //  // Management Info
    //  YearOfEstablishment: null,
    //  YearofRecognitionPri: null,
    //  YearOfRecognitionUprPri: null,
    //  YearOfRecognitionSec: null,
    //  YearOfRecognitionHigherSec: null,

    // // 3

    // isActive: null,
    // userId: null,
    // ipAddress: null

  };

  //  Step 3
  validationSchema: yup.ObjectSchema<IInstitution> = YupFiscalValidation.INSTITUTION;

  //  Step 4
  formError = (controlName: string, formName: any) => {
    return this.utilService.formError(controlName, formName);
  }

  constructor(
    private utilService: UtilService,
    private router: Router,
    private messageService: MessageService,
    private productService: ProductService,
    private httpService: HttpService,

  ) {
    this.InstitutionFrom = FormHandler.controls<IInstitution>(this.initialValues);
    this.InstitutionFrom.setValidators(FormHandler.validate<IInstitution>(this.validationSchema))
  }

  ngOnInit() {

    this.PrePrimaryList = AppConstant.DDL_YES_NO
    this.SchoolCategoryList = [{ categoryId: 1, categoryName: 'Pr. with Up.Pr.' }, { categoryId: 2, categoryName: 'Pr. with Up.Pr. sec. and H.Sec.' }];
    this.SchoolTypeList = [{ schoolTypeId: 1, schoolType: 'Co-educational' }, { schoolTypeId: 2, schoolType: 'Non Co-educational' }];

    this.MediumList = [{ mediumId: 1, medium: 'Tamil' },{ mediumId: 2, medium: 'English' }];
    console.log(this.PrePrimaryList);

    this.LoadApplication;
    this.GetCountries();
    this.GetStates();

  }

  // public fnGetByInstitutionId(){

  //   try {

  //     this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.EDIT + '/?institutionId' + this.InstitutionId)
  //     .subscribe({
  //       next:(result: any) =>{
  //         this.InstitutionId = result.institution;
  //         console.log('fnGetByInstitutionId',this.InstitutionId);

  //         if (this.InstitutionList != undefined && this.InstitutionList.length > 0) {
  //           this.InstitutionId = this.InstitutionList[0].institutionId;

  //         }
  //       },
  //       error: (err: HttpErrorResponse) => console.log('fnGetById',err)

  //     })
  //   } catch (error) {

  //   }
  // }



  public LoadApplication() {
    try {
      this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.LIST)
        .subscribe({
          next: (result: any) => {

          },
          error: (err: HttpErrorResponse) => console.log(err)

        })
    } catch (error) {

    }
  }

  Clear() {

    this.buttonText = "Save";
    this.IsUpdate = false;
    this.InstitutionFrom.reset();

  }

  Save() {

    try {
      let _apiUrl: string = '';
      let passSaveParams: any = {};
      if (this.IsUpdate) { //  UPDATE

        // passSaveParams.institutionId = this.InstitutionId;
        // passSaveParams.institutionName = this.InstitutionFrom.value['institutionName']
        // // passSaveParams.organizationId = this.OrganizationId;
        // // passSaveParams.organizationName = this.InstitutionFrom.value['organizationName']
        // passSaveParams.nameOfSchool = this.InstitutionFrom.value['nameOfSchool']
        // passSaveParams.shortName = this.InstitutionFrom.value['shortName']
        // passSaveParams.schoolUDISECode = this.InstitutionFrom.value['schoolUDISECode']
        // passSaveParams.affiliatedCode = this.InstitutionFrom.value['affiliatedCode']
        // passSaveParams.category = this.InstitutionFrom.value['category']

        // passSaveParams.addressOne = this.InstitutionFrom.value['address1']
        // passSaveParams.addressTwo = this.InstitutionFrom.value['address2']
        // passSaveParams.addressThree = this.InstitutionFrom.value['address3']
        // passSaveParams.addressFour = this.InstitutionFrom.value['address4']
        // passSaveParams.cityId = this.InstitutionFrom.value['cityId']
        // passSaveParams.stateId = this.InstitutionFrom.value['stateId']
        // passSaveParams.countryId = this.InstitutionFrom.value['countryId']
        // passSaveParams.pinCode = this.InstitutionFrom.value['pinCode']
        // passSaveParams.fax = this.InstitutionFrom.value['fax']
        // passSaveParams.mobileNumber1 = this.InstitutionFrom.value['mobileNumber1']
        // passSaveParams.mobileNumber2 = this.InstitutionFrom.value['mobileNumber2']
        // passSaveParams.phoneNumber1 = this.InstitutionFrom.value['phoneNumber1']
        // passSaveParams.phoneNumber2 = this.InstitutionFrom.value['phoneNumber2']
        // passSaveParams.primaryEmail = this.InstitutionFrom.value['primaryEmail']
        // passSaveParams.secondaryEmail = this.InstitutionFrom.value['secondaryEmail']
        // passSaveParams.website = this.InstitutionFrom.value['website']

        passSaveParams.isActive = true
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.UPDATE

      }
      else { //  SAVE

        // passSaveParams.institutionId = this.InstitutionId;
        // passSaveParams.institutionName = this.InstitutionFrom.value['institutionName']
        // // passSaveParams.organizationId = this.OrganizationId;
        // // passSaveParams.organizationName = this.InstitutionFrom.value['organizationName']
        // passSaveParams.nameOfSchool = this.InstitutionFrom.value['nameOfSchool']
        // passSaveParams.shortName = this.InstitutionFrom.value['shortName']
        // passSaveParams.schoolUDISECode = this.InstitutionFrom.value['schoolUDISECode']
        // passSaveParams.affiliatedCode = this.InstitutionFrom.value['affiliatedCode']
        // passSaveParams.category = this.InstitutionFrom.value['category']

        // passSaveParams.addressOne = this.InstitutionFrom.value['address1']
        // passSaveParams.addressTwo = this.InstitutionFrom.value['address2']
        // passSaveParams.addressThree = this.InstitutionFrom.value['address3']
        // passSaveParams.addressFour = this.InstitutionFrom.value['address4']
        // passSaveParams.cityId = this.InstitutionFrom.value['cityId']
        // passSaveParams.stateId = this.InstitutionFrom.value['stateId']
        // passSaveParams.countryId = this.InstitutionFrom.value['countryId']
        // passSaveParams.pinCode = this.InstitutionFrom.value['pinCode']
        // passSaveParams.fax = this.InstitutionFrom.value['fax']
        // passSaveParams.mobileNumber1 = this.InstitutionFrom.value['mobileNumber1']
        // passSaveParams.mobileNumber2 = this.InstitutionFrom.value['mobileNumber2']
        // passSaveParams.phoneNumber1 = this.InstitutionFrom.value['phoneNumber1']
        // passSaveParams.phoneNumber2 = this.InstitutionFrom.value['phoneNumber2']
        // passSaveParams.primaryEmail = this.InstitutionFrom.value['primaryEmail']
        // passSaveParams.secondaryEmail = this.InstitutionFrom.value['secondaryEmail']
        // passSaveParams.website = this.InstitutionFrom.value['website']

        passSaveParams.isActive = true
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.SAVE

      }
      console.log("Save / Update click", JSON.stringify(passSaveParams));
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

  public GetStates(){

    try {
      this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_STATES)
      .subscribe({
        next:(result:any) => {
          this.StateList = result.states;
        },
        error: (err: HttpErrorResponse) => console.log(err)
        
      })
    } catch (error) {
      
    }
  }

  filterState( event:AutoCompleteCompleteEvent){
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

  onSelectState(){
    if (this.InstitutionFrom.value['selectedState'] != undefined && this.InstitutionFrom.value['selectedState'] != null) {
      let _countryId: number = this.InstitutionFrom.value['selectedState'].countryId
      this.InstitutionFrom.get("selectedCountry")?.setValue(this.CoutryList.find(c => c.countryId === _countryId))

    } else {
      this.InstitutionFrom.get("selectedCountry")?.setValue(null);
    }
  }

  onClearState(){
    console.log('onClearState',this.InstitutionFrom);
    this.InstitutionFrom.get("selectedCountry")?.reset();
  }

  public GetCountries(){
    try {
      this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_COUNTRIES)
      .subscribe(
        {
          next:(result : any) =>{
            this.CoutryList = result.countries;
          },
          error: (err: HttpErrorResponse) => console.log(err)
          
        }
      )
    } catch (error) {
      
    }
  }

  filterCountry(event: AutoCompleteCompleteEvent) {

    let filtered: any[] = [];
    let query = event.query;

    for( let i = 0 ; i < (this.CoutryList as any[]).length; i++){
      let _countriesList = (this.CoutryList as any[])[i];
      if(_countriesList.countryName.toLowerCase().indexOf(query.toLowerCase()) == 0){
        filtered.push(_countriesList);
      }
    }
    this.filteredCoutryList = filtered
  }

  
  RedirecttoList() {
    this.router.navigate(['/apps/fiscal/institution-list'])
  }

  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }

}

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

import { IOrganization } from 'src/app/+fiscal/services/interfaces/IOrganization';
import { ILabel, IMedium, ISchoolCategory, ISchoolType } from 'src/app/+fiscal/services/interfaces/ICommon';
import { AppConstant } from 'src/app/config/app.contant';

import { IState } from 'src/app/shared/interface/IState';

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
  InstitutionForm: FormGroup<YupFormControls<IInstitution>>;

  //  Step 2
  initialValues: IInstitution = {

    institutionId: null,
    institutionName: null,
    organizationId: null,
    selectedOrganization: null,
    name: null,
    shortName: null,
    UDISECode: null,
    //
    stateId: null,
    selectedState: null,
    city: null,
    block: null,
    locationId: null,
    selectedLocation: null,
    cluster: null,
    ward: null,
    mohalla: null,
    pinCode: null,
    panchayat: null,
    municipality: null,
    schoolCategoryId: null,
    selectedCategory: null,
    stateManagementId: null,
    stateManagement: null,
    nationalManagementId: null,
    nationalManagement: null,
    schoolTypeId: null,
    selectedschoolType: null,
    classFrom: null,
    classTo: null,
    isPrePrimary: null,
    selectedPrePrimary: { label: 'Yes', labelId: '1' },
    mediumId: null,
    selectedMedium: null,
    //
    regAddress1: null,
    regAddress2: null,
    regAddress3: null,
    regAddress4: null,
    regCity: null,
    regStateId: null,
    regSelectedState: null,
    regCountryId: null,
    regSelectedCountry: null,
    regPINCode: null,
    mobileNumber1: null,
    mobileNumber2: null,
    phoneNumber1: null,
    phoneNumber2: null,
    fax: null,
    primaryEmail: null,
    secondaryEmail: null,
    website: null,
    //
    yearofEstablishment: null,
    yearofRecognition_Primary: null,
    yearofRecognition_UpperPrimary: null,
    yearofRecognition_Secondary: null,
    yearofRecognition_HigherSecondary: null,
    affiliationBoard_Secondary: null,
    affiliationBoard_HigherSecondary: null,
    isMinoritySchool: null,
    selectedMinoritySchool: { label: 'Yes', labelId: '1' },
    isthisaShiftSchool: null,
    selectedIsthisaShiftSchool: { label: 'No', labelId: '0' },
    buildingStatusId: null,
    selectedBuildingStatus: { label: 'Yes', labelId: '1' },
    boundaryWallId: null,
    selectedBoundaryWall: { label: 'Yes', labelId: '1' },
    noofBuildingBlocks: null,
    noofPuccaBuildingBlocks: null,
    isSpecialSchoolforCWSN: null,
    selectedIsSpecialSchoolforCWSN: { label: 'No', labelId: '0' },
    availabilityofRamps: null,
    selectedAvailabilityofRamps: { label: 'No', labelId: '0' },
    availabilityofHandrails: null,
    selectedAvailabilityofHandrails: { label: 'No', labelId: '0' },
    totalNoOfToilets_Boys: null,
    totalNoOfToilets_Girls: null,
    functional_Boys: null,
    functional_Girls: null,
    functionalCWSNFriendly_Boys: null,
    functionalCWSNFriendly_Girls: null,
    urinal_Boys: null,
    urinal_Girls: null,
    handwashNearToilet: null,
    selectedHandwashNearToilet: { label: 'Yes', labelId: '1' },
    handwashFacilityforMeal: null,
    selectedHandwashFacilityforMeal: { label: 'Yes', labelId: '1' },
    drinkingWaterAvailable: null,
    selectedDrinkingWaterAvailable: { label: 'Yes', labelId: '1' },
    drinkingWaterFunctional: null,
    selectedDrinkingWaterFunctional: { label: 'Yes', labelId: '1' },
    rainWaterHarvesting: null,
    selectedRainWaterHarvesting: { label: 'Yes', labelId: '1' },
    playgroundAvailable: null,
    selectedPlaygroundAvailable: { label: 'Yes', labelId: '1' },
    noofBuildingsInGoodCondition: null,
    noofBuildingNeedsMinorRepair: null,
    noofBuildingNeedsMajorRepair: null,
    otherRooms: null,
    libraryAvailability: null,
    selectedLibraryAvailability: { label: 'Yes', labelId: '1' },
    separateRoomforHM: null,
    selectedSeparateRoomforHM: { label: 'Yes', labelId: '1' },
    furnitureAvailability: null,
    selectedFurnitureAvailability: { label: 'Yes', labelId: '1' },
    electricityAvailability: null,
    selectedElectricityAvailability: { label: 'Yes', labelId: '1' },
    solarPanel: null,
    selectedSolarPanel: { label: 'No', labelId: '0' },
    medicalcheckups: null,
    selectedMedicalcheckups: { label: 'Yes', labelId: '1' },
    //
    iCTLab: null,
    selectedICTLab: { label: 'Yes', labelId: '1' },
    internetConnection: null,
    selectedInternetConnection: { label: 'Yes', labelId: '1' },
    dTHConnection: null,
    selectedDTHConnection: { label: 'No', labelId: '0' },
    noofDesktop: null,
    noofLaptop: null,
    noofTablet: null,
    noofPrinter: null,
    noofProjector: null,
    noofDigiBoard: null,
    //
    noofTeachers_Primary: null,
    noofTeachers_PrimaryandUpperPrimary: null,
    noofTeachers_HigerSecondaryOnly: null,
    noofTeachers_SecondaryandHigerSecondary: null,
    noofTeachers_PrePrimaryandPrimary: null,
    noofTeachers_UpperPrimary: null,
    noofTeachers_SecondaryOnly: null,
    noofTeachers_UpperPrimaryandSecondary: null,
    noofTeachers_PrePrimaryOnly: null,
    noofTeachers_Regular: null,
    noofTeachers_Parttime: null,
    noofTeachers_Contract: null,
    noofTeachers_Male: null,
    noofTeachers_Female: null,
    noofTeachers_Transgender: null,
    totalNoofTeachers: null,
    noofTotalTeacherReceivedServiceTraining: null,
    totalTeacherInvolveinNonTeachingAssignment: null,
    noofTeachers_BelowGraduate: null,
    noofTeachers_Graduate: null,
    noofTeachers_PostGraduateandAbove: null,
    noofTotalTeachersTrainedinComputer: null,
    noofTeachers_AgedAbove55: null,
    noofTeachers_DiplomaorCertificateinbasicteacherstraining: null,
    noofTeachers_BachelorofElementaryEducation: null,
    noofTeachers_BEdorEquivalent: null,
    noofTeachers_MEdorEquivalent: null,
    noofTeachers_DiplomaorDegreeinSpecialEducation: null,
    noofTeachers_PursuinganyRelevantProfessionalCourse: null,
    //
    isActive: null,
    userId: null,
    ipAddress: null


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
    this.InstitutionForm = FormHandler.controls<IInstitution>(this.initialValues);
    this.InstitutionForm.setValidators(FormHandler.validate<IInstitution>(this.validationSchema))
  }

  ngOnInit() {

    this.PrePrimaryList = AppConstant.DDL_YES_NO
    this.SchoolCategoryList = [{ categoryId: 1, categoryName: 'Pr. with Up.Pr.' }, { categoryId: 2, categoryName: 'Pr. with Up.Pr. sec. and H.Sec.' }];
    this.SchoolTypeList = [{ schoolTypeId: 1, schoolType: 'Co-educational' }, { schoolTypeId: 2, schoolType: 'Non Co-educational' }];

    this.MediumList = [{ mediumId: 1, medium: 'Tamil' }, { mediumId: 2, medium: 'English' }];

    //   const selectedPrePrimaryControl = this.InstitutionForm.controls['selectedPrePrimary'] as FormControl;
    //   if (this.InstitutionForm.controls['selectedPrePrimary']) {
    //     selectedPrePrimaryControl.setValue("1"); // Assuming "1" corresponds to "Yes"
    // }

    console.log(this.PrePrimaryList);

    this.LoadApplication;
    // this.GetCountries();
    // this.GetStates();

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
    this.InstitutionForm.reset();

  }

  Save() {

    try {
      let _apiUrl: string = '';
      let passSaveParams: any = {};
      if (this.IsUpdate) { //  UPDATE

        // passSaveParams.InstitutionId = this.InstitutionId;
        // passSaveParams.InstitutionName = this.InstitutionForm.value['institutionName']
        // // passSaveParams.OrganizationId = this.OrganizationId;
        // // passSaveParams.organizationName = this.InstitutionForm.value['organizationName']
        // passSaveParams.Name = this.InstitutionForm.value['nameOfSchool']
        // passSaveParams.ShortName = this.InstitutionForm.value['shortName']
        // passSaveParams.UDISECode = this.InstitutionForm.value['schoolUDISECode']
        // passSaveParams.affiliatedCode = this.InstitutionForm.value['affiliatedCode']
        // passSaveParams.category = this.InstitutionForm.value['category']

        // passSaveParams.RegAddress1 = this.InstitutionForm.value['address1']
        // passSaveParams.RegAddress2 = this.InstitutionForm.value['address2']
        // passSaveParams.RegAddress3 = this.InstitutionForm.value['address3']
        // passSaveParams.RegAddress4 = this.InstitutionForm.value['address4']
        // passSaveParams.RegCity = this.InstitutionForm.value['cityId']
        // passSaveParams.RegStateId = this.InstitutionForm.value['stateId']
        // passSaveParams.RegCountryId = this.InstitutionForm.value['countryId']
        // passSaveParams.RegPINCode = this.InstitutionForm.value['pinCode']
        // passSaveParams.Fax = this.InstitutionForm.value['fax']
        // passSaveParams.MobileNumber1 = this.InstitutionForm.value['mobileNumber1']
        // passSaveParams.MobileNumber2 = this.InstitutionForm.value['mobileNumber2']
        // passSaveParams.PhoneNumber1 = this.InstitutionForm.value['phoneNumber1']
        // passSaveParams.PhoneNumber2 = this.InstitutionForm.value['phoneNumber2']
        // passSaveParams.PrimaryEmail = this.InstitutionForm.value['primaryEmail']
        // passSaveParams.SecondaryEmail = this.InstitutionForm.value['secondaryEmail']
        // passSaveParams.Website = this.InstitutionForm.value['website']

        passSaveParams.isActive = true
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.UPDATE

      }
      else { //  SAVE

        passSaveParams.institutionId = this.InstitutionId;
        passSaveParams.institutionName = this.InstitutionForm.value['institutionName']
        passSaveParams.selectedOrganization = this.InstitutionForm.value['selectedOrganization']
        passSaveParams.name = this.InstitutionForm.value['name']
        passSaveParams.shortName = this.InstitutionForm.value['shortName']
        passSaveParams.UDISECode = this.InstitutionForm.value['UDISECode']

        passSaveParams.stateId = this.InstitutionForm.value['selectedState'] != null ? this.InstitutionForm.value['selectedState'] : ''; // .StateId : 0; not added
        passSaveParams.city = this.InstitutionForm.value['city'] != null ? this.InstitutionForm.value['city'] : '';
        passSaveParams.block = this.InstitutionForm.value['block'] != null ? this.InstitutionForm.value['block'] : '';
        passSaveParams.selectedLocation = this.InstitutionForm.value['selectedLocation'] != null ? this.InstitutionForm.value['selectedLocation'] : '';  // .LocationId : 0; not added
        passSaveParams.cluster = this.InstitutionForm.value['cluster'] != null ? this.InstitutionForm.value['cluster'] : '';
        passSaveParams.ward = this.InstitutionForm.value['ward'] != null ? this.InstitutionForm.value['ward'] : '';
        passSaveParams.mohalla = this.InstitutionForm.value['mohalla'] != null ? this.InstitutionForm.value['mohalla'] : '';
        passSaveParams.pinCode = this.InstitutionForm.value['pinCode'] != null ? +(this.InstitutionForm.value['pinCode']) : 0;
        passSaveParams.panchayat = this.InstitutionForm.value['panchayat'] != null ? this.InstitutionForm.value['panchayat'] : '';
        passSaveParams.municipality = this.InstitutionForm.value['municipality'] != null ? this.InstitutionForm.value['municipality'] : '';
        passSaveParams.selectedCategory = this.InstitutionForm.value['selectedCategory'] != null ? this.InstitutionForm.value['selectedCategory'] : '';
        passSaveParams.stateManagement = this.InstitutionForm.value['stateManagement'] != null ? this.InstitutionForm.value['stateManagement'] : '';
        passSaveParams.nationalManagement = this.InstitutionForm.value['nationalManagement'] != null ? this.InstitutionForm.value['nationalManagement'] : '';
        passSaveParams.selectedschoolType = this.InstitutionForm.value['selectedschoolType'] != null ? this.InstitutionForm.value['selectedschoolType'] : '';
        passSaveParams.classFrom = this.InstitutionForm.value['classFrom'] != null ? this.InstitutionForm.value['classFrom'] : '';
        passSaveParams.classTo = this.InstitutionForm.value['classTo'] != null ? this.InstitutionForm.value['classTo'] : '';
        passSaveParams.selectedPrePrimary = this.InstitutionForm.value['selectedPrePrimary'] != null ? this.InstitutionForm.value['selectedPrePrimary'] : '';
        passSaveParams.selectedMedium = this.InstitutionForm.value['selectedMedium'] != null ? this.InstitutionForm.value['selectedMedium'] : '';

        passSaveParams.regAddress1 = this.InstitutionForm.value['regAddress1'] != null ? this.InstitutionForm.value['regAddress1'] : '';
        passSaveParams.regAddress2 = this.InstitutionForm.value['regAddress2'] != null ? this.InstitutionForm.value['regAddress2'] : '';
        passSaveParams.regAddress3 = this.InstitutionForm.value['regAddress3'] != null ? this.InstitutionForm.value['regAddress3'] : '';
        passSaveParams.regAddress4 = this.InstitutionForm.value['regAddress4'] != null ? this.InstitutionForm.value['regAddress4'] : '';
        passSaveParams.regCity = this.InstitutionForm.value['regCity'] != null ? this.InstitutionForm.value['regCity'] : '';
        passSaveParams.regStateId = this.InstitutionForm.value['regSelectedState'] != null ? this.InstitutionForm.value['regSelectedState'] : '';  // .RegStateId : 0; not added
        passSaveParams.regCountryId = this.InstitutionForm.value['regSelectedCountry'] != null ? this.InstitutionForm.value['regSelectedCountry'] : ''; // .RegCountryId : 0; not added
        passSaveParams.regPINCode = this.InstitutionForm.value['regPINCode'] != null ? +(this.InstitutionForm.value['regPINCode']) : 0;
        passSaveParams.mobileNumber1 = this.InstitutionForm.value['mobileNumber1'] != null ? this.InstitutionForm.value['mobileNumber1'] : '';
        passSaveParams.mobileNumber2 = this.InstitutionForm.value['mobileNumber2'] != null ? this.InstitutionForm.value['mobileNumber2'] : '';
        passSaveParams.phoneNumber1 = this.InstitutionForm.value['phoneNumber1'] != null ? this.InstitutionForm.value['phoneNumber1'] : '';
        passSaveParams.phoneNumber2 = this.InstitutionForm.value['phoneNumber2'] != null ? this.InstitutionForm.value['phoneNumber2'] : '';
        passSaveParams.fax = this.InstitutionForm.value['fax'] != null ? this.InstitutionForm.value['fax'] : '';
        passSaveParams.primaryEmail = this.InstitutionForm.value['primaryEmail'] != null ? this.InstitutionForm.value['primaryEmail'] : '';
        passSaveParams.secondaryEmail = this.InstitutionForm.value['secondaryEmail'] != null ? this.InstitutionForm.value['secondaryEmail'] : '';
        passSaveParams.website = this.InstitutionForm.value['website'] != null ? this.InstitutionForm.value['website'] : '';

        passSaveParams.yearofEstablishment = this.InstitutionForm.value['yearofEstablishment'] != null ? this.InstitutionForm.value['yearofEstablishment'] : '';
        passSaveParams.yearofRecognition_Primary = this.InstitutionForm.value['yearofRecognition_Primary'] != null ? this.InstitutionForm.value['yearofRecognition_Primary'] : '';
        passSaveParams.yearofRecognition_UpperPrimary = this.InstitutionForm.value['yearofRecognition_UpperPrimary'] != null ? this.InstitutionForm.value['yearofRecognition_UpperPrimary'] : '';
        passSaveParams.yearofRecognition_Secondary = this.InstitutionForm.value['yearofRecognition_Secondary'] != null ? this.InstitutionForm.value['yearofRecognition_Secondary'] : '';
        passSaveParams.yearofRecognition_HigherSecondary = this.InstitutionForm.value['yearofRecognition_HigherSecondary'] != null ? this.InstitutionForm.value['yearofRecognition_HigherSecondary'] : '';
        passSaveParams.affiliationBoard_Secondary = this.InstitutionForm.value['affiliationBoard_Secondary'] != null ? this.InstitutionForm.value['affiliationBoard_Secondary'] : '';
        passSaveParams.affiliationBoard_HigherSecondary = this.InstitutionForm.value['affiliationBoard_HigherSecondary'] != null ? this.InstitutionForm.value['affiliationBoard_HigherSecondary'] : '';
        passSaveParams.selectedMinoritySchool = this.InstitutionForm.value['selectedMinoritySchool'] != null ? this.InstitutionForm.value['selectedMinoritySchool'] : '';
        passSaveParams.selectedIsthisaShiftSchool = this.InstitutionForm.value['selectedIsthisaShiftSchool'] != null ? this.InstitutionForm.value['selectedIsthisaShiftSchool'] : '';
        passSaveParams.selectedBuildingStatus = this.InstitutionForm.value['selectedBuildingStatus'] != null ? this.InstitutionForm.value['selectedBuildingStatus'] : '';
        passSaveParams.SelectedBoundaryWall = this.InstitutionForm.value['selectedBoundaryWall'] != null ? this.InstitutionForm.value['selectedBoundaryWall'] : '';
        passSaveParams.noofBuildingBlocks = this.InstitutionForm.value['noofBuildingBlocks'] != null ? this.InstitutionForm.value['noofBuildingBlocks'] : '';
        passSaveParams.noofPuccaBuildingBlocks = this.InstitutionForm.value['noofPuccaBuildingBlocks'] != null ? this.InstitutionForm.value['noofPuccaBuildingBlocks'] : '';
        passSaveParams.selectedIsSpecialSchoolforCWSN = this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'] != null ? this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'] : '';
        passSaveParams.selectedAvailabilityofRamps = this.InstitutionForm.value['selectedAvailabilityofRamps'] != null ? this.InstitutionForm.value['selectedAvailabilityofRamps'] : '';
        passSaveParams.selectedAvailabilityofHandrails = this.InstitutionForm.value['selectedAvailabilityofHandrails'] != null ? this.InstitutionForm.value['selectedAvailabilityofHandrails'] : '';
        passSaveParams.totalNoOfToilets_Boys = this.InstitutionForm.value['totalNoOfToilets_Boys'] != null ? this.InstitutionForm.value['totalNoOfToilets_Boys'] : '';
        passSaveParams.totalNoOfToilets_Girls = this.InstitutionForm.value['totalNoOfToilets_Girls'] != null ? this.InstitutionForm.value['totalNoOfToilets_Girls'] : '';
        passSaveParams.functional_Boys = this.InstitutionForm.value['functional_Boys'] != null ? this.InstitutionForm.value['functional_Boys'] : '';
        passSaveParams.functional_Girls = this.InstitutionForm.value['functional_Girls'] != null ? this.InstitutionForm.value['functional_Girls'] : '';
        passSaveParams.functionalCWSNFriendly_Boys = this.InstitutionForm.value['functionalCWSNFriendly_Boys'] != null ? this.InstitutionForm.value['functionalCWSNFriendly_Boys'] : '';
        passSaveParams.functionalCWSNFriendly_Girls = this.InstitutionForm.value['functionalCWSNFriendly_Girls'] != null ? this.InstitutionForm.value['functionalCWSNFriendly_Girls'] : '';
        passSaveParams.urinal_Boys = this.InstitutionForm.value['urinal_Boys'] != null ? this.InstitutionForm.value['urinal_Boys'] : '';
        passSaveParams.urinal_Girls = this.InstitutionForm.value['urinal_Girls'] != null ? this.InstitutionForm.value['urinal_Girls'] : '';
        passSaveParams.selectedHandwashNearToilet = this.InstitutionForm.value['selectedHandwashNearToilet'] != null ? this.InstitutionForm.value['selectedHandwashNearToilet'] : '';
        passSaveParams.selectedHandwashFacilityforMeal = this.InstitutionForm.value['selectedHandwashFacilityforMeal'] != null ? this.InstitutionForm.value['selectedHandwashFacilityforMeal'] : '';
        passSaveParams.selectedDrinkingWaterAvailable = this.InstitutionForm.value['selectedDrinkingWaterAvailable'] != null ? this.InstitutionForm.value['selectedDrinkingWaterAvailable'] : '';
        passSaveParams.selectedDrinkingWaterFunctional = this.InstitutionForm.value['selectedDrinkingWaterFunctional'] != null ? this.InstitutionForm.value['selectedDrinkingWaterFunctional'] : '';
        passSaveParams.selectedRainWaterHarvesting = this.InstitutionForm.value['selectedRainWaterHarvesting'] != null ? this.InstitutionForm.value['selectedRainWaterHarvesting'] : '';
        passSaveParams.selectedPlaygroundAvailable = this.InstitutionForm.value['selectedPlaygroundAvailable'] != null ? this.InstitutionForm.value['selectedPlaygroundAvailable'] : '';
        passSaveParams.noofBuildingsInGoodCondition = this.InstitutionForm.value['noofBuildingsInGoodCondition'] != null ? this.InstitutionForm.value['noofBuildingsInGoodCondition'] : '';
        passSaveParams.noofBuildingNeedsMinorRepair = this.InstitutionForm.value['noofBuildingNeedsMinorRepair'] != null ? this.InstitutionForm.value['noofBuildingNeedsMinorRepair'] : '';
        passSaveParams.noofBuildingNeedsMajorRepair = this.InstitutionForm.value['noofBuildingNeedsMajorRepair'] != null ? this.InstitutionForm.value['noofBuildingNeedsMajorRepair'] : '';
        passSaveParams.otherRooms = this.InstitutionForm.value['otherRooms'] != null ? this.InstitutionForm.value['otherRooms'] : '';
        passSaveParams.selectedLibraryAvailability = this.InstitutionForm.value['selectedLibraryAvailability'] != null ? this.InstitutionForm.value['selectedLibraryAvailability'] : '';
        passSaveParams.selectedSeparateRoomforHM = this.InstitutionForm.value['selectedSeparateRoomforHM'] != null ? this.InstitutionForm.value['selectedSeparateRoomforHM'] : '';
        passSaveParams.selectedFurnitureAvailability = this.InstitutionForm.value['selectedFurnitureAvailability'] != null ? this.InstitutionForm.value['selectedFurnitureAvailability'] : '';
        passSaveParams.selectedElectricityAvailability = this.InstitutionForm.value['selectedElectricityAvailability'] != null ? this.InstitutionForm.value['selectedElectricityAvailability'] : '';
        passSaveParams.selectedSolarPanel = this.InstitutionForm.value['selectedSolarPanel'] != null ? this.InstitutionForm.value['selectedSolarPanel'] : '';
        passSaveParams.selectedMedicalcheckups = this.InstitutionForm.value['selectedMedicalcheckups'] != null ? this.InstitutionForm.value['selectedMedicalcheckups'] : '';

        // passSaveParams.selectedICTLab =




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

  public GetStates() {

    try {
      this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_STATES)
        .subscribe({
          next: (result: any) => {
            this.StateList = result.states;
          },
          error: (err: HttpErrorResponse) => console.log(err)

        })
    } catch (error) {

    }
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
    // if (this.InstitutionForm.value['regSelectedState'] != undefined && this.InstitutionForm.value['regSelectedState'] != null) {
    //   let _countryId: number = this.InstitutionForm.value['regSelectedState'].countryId
    //   this.InstitutionForm.get("regSelectedCountry")?.setValue(this.CoutryList.find(c => c.countryId === _countryId))

    // } else {
    //   this.InstitutionForm.get("regSelectedCountry")?.setValue(null);
    // }
  }

  onClearState() {
    console.log('onClearState', this.InstitutionForm);
    this.InstitutionForm.get("regSelectedCountry")?.reset();
  }



  public GetCountries() {
    try {
      this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_COUNTRIES)
        .subscribe(
          {
            next: (result: any) => {
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

    for (let i = 0; i < (this.CoutryList as any[]).length; i++) {
      let _countriesList = (this.CoutryList as any[])[i];
      if (_countriesList.countryName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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

import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';

import { IInstitution } from 'src/app/+fiscal/services/interfaces/IInstitution';

import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';

import * as yup from "yup";
import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';

import { IAC_Organization, IBoard, IBoundarywall, IBuildingStatus, ILabel, ILocation, IMediumofInstruction, INationalManagement, ISchoolCategory, ISchoolType, IStateManagement } from 'src/app/+fiscal/services/interfaces/ICommon';

import { IState } from 'src/app/shared/interface/IState';

import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { APIConfig } from 'src/app/config/api.config';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { AppConstant } from 'src/app/config/app.constant';

import * as _ from 'lodash';
import { FiscalService } from 'src/app/+fiscal/services/fiscal-service';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent  {

  OrganizationList: IAC_Organization[] = [];
  filteredOrganization: IAC_Organization[] = [];

  StateList: IState[] = [];
  filteredStateList: IState[] = []

  LocationList : ILocation[]=[];

  SchoolCategoryList: ISchoolCategory[] = [];

  StateManagementList: IStateManagement[] = [];

  NationalManagementList: INationalManagement[] = [];

  SchoolTypeList: ISchoolType[] = [];

  MediumofInstructionList: IMediumofInstruction[] = [];

  InstitutionsData:any;

  BoardList: IBoard[] = [];

  BuildingStatusList: IBuildingStatus[] = [];
  BoundarywallList: IBoundarywall[] = [];

  PrePrimaryList: ILabel[] = [];
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

  private IsUpdate: boolean = false;

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
    udiseCode: null,
    //
    stateId: null,
    selectedState: null,
    city: null,
    block: null,
    locationId: null,
    selectedLocation: null,
    cluster: null,
    ward: null,
    mahalla: null,
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
    selectedSchoolType: null,
    classFrom: null,
    classTo: null,
    isPrePrimary: null,
    selectedPrePrimary: { label: 'Yes', labelId: true },
    instructionId: null,
    selectedMedium: null,
    selectedBoard:null,
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
    yearofRecognitionPrimary: null,
    yearofRecognitionUpperPrimary: null,
    yearofRecognitionSecondary: null,
    yearofRecognitionHigherSecondary: null,
    affiliationBoardSecondary: null,
    affiliationBoardHigherSecondary: null,
    isMinoritySchool: null,
    selectedMinoritySchool: { label: 'Yes', labelId: true },
    isthisaShiftSchool: null,
    selectedIsthisaShiftSchool: { label: 'No', labelId: false },
    buildingStatusId: null,
    selectedBuildingStatus: { label: 'Yes', labelId: true },
    boundaryWallId: null,
    selectedBoundaryWall: { label: 'Yes', labelId: true },
    noofBuildingBlocks: null,
    noofPuccaBuildingBlocks: null,
    isSpecialSchoolforCWSN: null,
    selectedIsSpecialSchoolforCWSN: { label: 'No', labelId: false },
    availabilityofRamps: null,
    selectedAvailabilityofRamps: { label: 'No', labelId: false },
    availabilityofHandrails: null,
    selectedAvailabilityofHandrails: { label: 'No', labelId: false },
    totalNoOfToiletsBoys: null,
    totalNoOfToiletsGirls: null,
    functionalBoys: null,
    functionalGirls: null,
    functionalCWSNFriendlyBoys: null,
    functionalCWSNFriendlyGirls: null,
    urinalBoys: null,
    urinalGirls: null,
    handwashNearToilet: null,
    selectedHandwashNearToilet: { label: 'Yes', labelId: true },
    handwashFacilityforMeal: null,
    selectedHandwashFacilityforMeal: { label: 'Yes', labelId: true },
    drinkingWaterAvailable: null,
    selectedDrinkingWaterAvailable: { label: 'Yes', labelId: true },
    drinkingWaterFunctional: null,
    selectedDrinkingWaterFunctional: { label: 'Yes', labelId: true },
    rainWaterHarvesting: null,
    selectedRainWaterHarvesting: { label: 'Yes', labelId: true },
    playgroundAvailable: null,
    selectedPlaygroundAvailable: { label: 'Yes', labelId: true },
    noofBuildingsInGoodCondition: null,
    noofBuildingNeedsMinorRepair: null,
    noofBuildingNeedsMajorRepair: null,
    otherRooms: null,
    libraryAvailability: null,
    selectedLibraryAvailability: { label: 'Yes', labelId: true },
    separateRoomforHM: null,
    selectedSeparateRoomforHM: { label: 'Yes', labelId: true },
    furnitureAvailability: null,
    selectedFurnitureAvailability: { label: 'Yes', labelId: true },
    electricityAvailability: null,
    selectedElectricityAvailability: { label: 'Yes', labelId: true },
    solarPanel: null,
    selectedSolarPanel: { label: 'No', labelId: false },
    medicalcheckups: null,
    selectedMedicalcheckups: { label: 'Yes', labelId: true },
    //
    ictLab: null,
    selectedICTLab: { label: 'Yes', labelId: true },
    internetConnection: null,
    selectedInternetConnection: { label: 'Yes', labelId: true },
    dthConnection: null,
    selectedDTHConnection: { label: 'No', labelId: false },
    noofDesktop: null,
    noofLaptop: null,
    noofTablet: null,
    noofPrinter: null,
    noofProjector: null,
    noofDigiBoard: null,
    //
    noofTeachersPrimary: null,
    noofTeachersPrimaryandUpperPrimary: null,
    noofTeachersHigerSecondaryOnly: null,
    noofTeachersSecondaryandHigerSecondary: null,
    noofTeachersPrePrimaryandPrimary: null,
    noofTeachersUpperPrimary: null,
    noofTeachersSecondaryOnly: null,
    noofTeachersUpperPrimaryandSecondary: null,
    noofTeachersPrePrimaryOnly: null,
    noofTeachersRegular: null,
    noofTeachersParttime: null,
    noofTeachersContract: null,
    noofTeachersMale: null,
    noofTeachersFemale: null,
    noofTeachersTransgender: null,
    totalNoofTeachers: null,
    noofTotalTeacherReceivedServiceTraining: null,
    totalTeacherInvolveinNonTeachingAssignment: null,
    noofTeachersBelowGraduate: null,
    noofTeachersGraduate: null,
    noofTeachersPostGraduateandAbove: null,
    noofTotalTeachersTrainedinComputer: null,
    noofTeachersAgedAbove55: null,
    noofTeachersDiplomaorCertificateinbasicteacherstraining: null,
    noofTeachersBachelorofElementaryEducation: null,
    noofTeachersBEdorEquivalent: null,
    noofTeachersMEdorEquivalent: null,
    noofTeachersDiplomaorDegreeinSpecialEducation: null,
    noofTeachersPursuinganyRelevantProfessionalCourse: null,
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
    private fiscalService : FiscalService,
    private httpService: CommonHttpService,
    private activatedRoute: ActivatedRoute,

  ) {

    this.PrePrimaryList = AppConstant.DDL_YES_NO;
    // this.LoadInstitutionsData();
  

    this.InstitutionForm = FormHandler.controls<IInstitution>(this.initialValues);
    this.InstitutionForm.setValidators(FormHandler.validate<IInstitution>(this.validationSchema));
    

    //#region 
    this.activatedRoute.params.subscribe((params: any) => {
      if (params != undefined && !_.isEmpty(params)) {
        this.InstitutionId = (+(params.id));
        console.log('Params',this.InstitutionId);

        this.buttonText = "Update";
        this.IsUpdate = true;
      } else {
        this.InstitutionId = 0;
        this.IsUpdate = false;
      }
    });
    //#endregion

    // if (this.InstitutionId != undefined && this.InstitutionId != 0) {
    //   this.GetInstitutionById(); //  Get Organization Detail based on Id
    // }
   

  }


  async ngOnInit(): Promise<void> {

    //#region  FETCH STATES DATA
    try {
       this.GetStates();
      // const statesData = await this.fiscalService.fetchStates();
      // this.StateList = statesData;
    } catch (error) {
    }
    //#endregion

    //#region  FETCH COUNTRIES DATA
    try {
       this.GetCountries();
      // const countriesData = await this.fiscalService.fetchCountries();
      // this.CoutryList = countriesData;
    } catch (error) {
    }
    //#endregion

    //#region  FETCH INSTITUTION'S DDL/AUTOCOMPLETE DATA
    try {

      const institutionData = await this.fiscalService.fetchInstitutionsData();

      // Process the data here
      this.OrganizationList = institutionData.institutionsData.orgList;
      this.LocationList = institutionData.institutionsData.locList;
      this.SchoolCategoryList = institutionData.institutionsData.categoryList;

      this.StateManagementList = institutionData.institutionsData.smList;
      this.NationalManagementList = institutionData.institutionsData.nmList;
      this.SchoolTypeList = institutionData.institutionsData.typeList;
      this.MediumofInstructionList = institutionData.institutionsData.instructionList;
      this.BoardList = institutionData.institutionsData.boardList;

      this.BuildingStatusList = institutionData.institutionsData.buildingList;
      this.BoundarywallList = institutionData.institutionsData.boundaryList;

    } catch (error) {
      // Handle error
    }
    //#endregion

    //#region  FETCH INSTITUTION'S  DATA - EDIT and LOAD
    if (this.InstitutionId != undefined && this.InstitutionId != 0) {

      try {

        const data = await this.fiscalService.fetchInstitutionById(this.InstitutionId);

        this.InstitutionList = data.institutions;
        console.log('fetchInstitutionById:', JSON.stringify(this.InstitutionList));

        if (this.InstitutionList != undefined && this.InstitutionList.length > 0) {


          console.log('this.regCountryId',this.CoutryList.find(app => app.countryId === this.InstitutionList[0].regCountryId));
          console.log('this.CoutryList',this.CoutryList);
          console.log('InstitutionList[0]regCountryId',this.InstitutionList[0].regCountryId);
          this.InstitutionId = this.InstitutionId;//Params Id
          this.InstitutionForm.controls['selectedOrganization']?.setValue(this.OrganizationList.find(app => app.organizationId === this.InstitutionList[0].organizationId));
          this.InstitutionForm.controls['institutionName']?.setValue(this.InstitutionList[0].name);
          this.InstitutionForm.controls['shortName']?.setValue(this.InstitutionList[0].shortName);
          this.InstitutionForm.controls['udiseCode']?.setValue(this.InstitutionList[0].udiseCode);

          this.InstitutionForm.controls['selectedState']?.setValue(this.StateList.find(app => app.stateId === this.InstitutionList[0].stateId)); //selectedState
          this.InstitutionForm.controls['city']?.setValue(this.InstitutionList[0].city);
          this.InstitutionForm.controls['block']?.setValue(this.InstitutionList[0].block);
          this.InstitutionForm.controls['selectedLocation']?.setValue(this.LocationList.find(app => app.locationId === this.InstitutionList[0].locationId));
          this.InstitutionForm.controls['cluster']?.setValue(this.InstitutionList[0].cluster);
          this.InstitutionForm.controls['ward']?.setValue(this.InstitutionList[0].ward);
          this.InstitutionForm.controls['mahalla']?.setValue(this.InstitutionList[0].mahalla);
          this.InstitutionForm.controls['pinCode']?.setValue(this.InstitutionList[0].pinCode);
          this.InstitutionForm.controls['panchayat']?.setValue(this.InstitutionList[0].panchayat);
          this.InstitutionForm.controls['municipality']?.setValue(this.InstitutionList[0].municipality);
          this.InstitutionForm.controls['selectedCategory']?.setValue(this.SchoolCategoryList.find(app => app.categoryId === this.InstitutionList[0].schoolCategoryId));
          this.InstitutionForm.controls['stateManagement']?.setValue(this.StateManagementList.find(app => app.stateManagementId === this.InstitutionList[0].stateManagementId));
          this.InstitutionForm.controls['nationalManagement']?.setValue(this.NationalManagementList.find(app => app.nationalManagementId === this.InstitutionList[0].nationalManagementId));
          this.InstitutionForm.controls['selectedSchoolType']?.setValue(this.SchoolTypeList.find(app => app.typeId === this.InstitutionList[0].schoolTypeId));
          this.InstitutionForm.controls['classFrom']?.setValue(this.InstitutionList[0].classFrom);
          this.InstitutionForm.controls['classTo']?.setValue(this.InstitutionList[0].classTo);
          this.InstitutionForm.controls['selectedPrePrimary']?.setValue(this.PrePrimaryList.find(app => app.labelId === this.InstitutionList[0].isPrePrimary));
          this.InstitutionForm.controls['selectedMedium']?.setValue(this.MediumofInstructionList.find(app => app.instructionId === this.InstitutionList[0].instructionId));
          this.InstitutionForm.controls['selectedBoard']?.setValue(this.InstitutionList[0].selectedBoard);

          this.InstitutionForm.controls['regAddress1']?.setValue(this.InstitutionList[0].regAddress1);
          this.InstitutionForm.controls['regAddress2']?.setValue(this.InstitutionList[0].regAddress2);
          this.InstitutionForm.controls['regAddress3']?.setValue(this.InstitutionList[0].regAddress3);
          this.InstitutionForm.controls['regAddress4']?.setValue(this.InstitutionList[0].regAddress4);
          this.InstitutionForm.controls['regCity']?.setValue(this.InstitutionList[0].regCity);
          this.InstitutionForm.controls['regSelectedState']?.setValue(this.StateList.find(app => app.stateId === this.InstitutionList[0].regStateId)); // regSelectedState
          this.InstitutionForm.controls['regSelectedCountry']?.setValue(this.CoutryList.find(app => app.countryId === this.InstitutionList[0].regCountryId)); // regSelectedCountry
          this.InstitutionForm.controls['regPINCode']?.setValue(this.InstitutionList[0].regPINCode);
          this.InstitutionForm.controls['mobileNumber1']?.setValue(this.InstitutionList[0].mobileNumber1);
          this.InstitutionForm.controls['mobileNumber2']?.setValue(this.InstitutionList[0].mobileNumber2);
          this.InstitutionForm.controls['phoneNumber1']?.setValue(this.InstitutionList[0].phoneNumber1);
          this.InstitutionForm.controls['phoneNumber2']?.setValue(this.InstitutionList[0].phoneNumber2);
          this.InstitutionForm.controls['fax']?.setValue(this.InstitutionList[0].fax);
          this.InstitutionForm.controls['primaryEmail']?.setValue(this.InstitutionList[0].primaryEmail);
          this.InstitutionForm.controls['secondaryEmail']?.setValue(this.InstitutionList[0].secondaryEmail);
          this.InstitutionForm.controls['website']?.setValue(this.InstitutionList[0].website);


          this.InstitutionForm.controls['yearofEstablishment']?.setValue(this.InstitutionList[0].yearofEstablishment);
          this.InstitutionForm.controls['yearofRecognitionPrimary']?.setValue(this.InstitutionList[0].yearofRecognitionPrimary);
          this.InstitutionForm.controls['yearofRecognitionUpperPrimary']?.setValue(this.InstitutionList[0].yearofRecognitionUpperPrimary);
          this.InstitutionForm.controls['yearofRecognitionSecondary']?.setValue(this.InstitutionList[0].yearofRecognitionSecondary);
          this.InstitutionForm.controls['yearofRecognitionHigherSecondary']?.setValue(this.InstitutionList[0].yearofRecognitionHigherSecondary);
          this.InstitutionForm.controls['affiliationBoardSecondary']?.setValue(this.InstitutionList[0].affiliationBoardSecondary);
          this.InstitutionForm.controls['affiliationBoardHigherSecondary']?.setValue(this.InstitutionList[0].affiliationBoardHigherSecondary);

          this.InstitutionForm.controls['selectedMinoritySchool']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].isMinoritySchool));
          this.InstitutionForm.controls['selectedIsthisaShiftSchool']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].isthisaShiftSchool));
          this.InstitutionForm.controls['selectedBuildingStatus']?.setValue(this.BuildingStatusList.find(app => app.buildingStatusId === this.InstitutionList[0].buildingStatusId));
          this.InstitutionForm.controls['selectedBoundaryWall']?.setValue(this.BoundarywallList.find(app => app.boundarywallId === this.InstitutionList[0].boundaryWallId));
          this.InstitutionForm.controls['noofBuildingBlocks']?.setValue(this.InstitutionList[0].noofBuildingBlocks);
          this.InstitutionForm.controls['noofPuccaBuildingBlocks']?.setValue(this.InstitutionList[0].noofPuccaBuildingBlocks);
          this.InstitutionForm.controls['selectedIsSpecialSchoolforCWSN']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].isSpecialSchoolforCWSN));
          this.InstitutionForm.controls['selectedAvailabilityofRamps']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].availabilityofRamps));
          this.InstitutionForm.controls['selectedAvailabilityofHandrails']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].availabilityofHandrails));


          this.InstitutionForm.controls['totalNoOfToiletsBoys']?.setValue(this.InstitutionList[0].totalNoOfToiletsBoys);
          this.InstitutionForm.controls['totalNoOfToiletsGirls']?.setValue(this.InstitutionList[0].totalNoOfToiletsGirls);
          this.InstitutionForm.controls['functionalBoys']?.setValue(this.InstitutionList[0].functionalBoys);
          this.InstitutionForm.controls['functionalGirls']?.setValue(this.InstitutionList[0].functionalGirls);
          this.InstitutionForm.controls['functionalCWSNFriendlyBoys']?.setValue(this.InstitutionList[0].functionalCWSNFriendlyBoys);
          this.InstitutionForm.controls['functionalCWSNFriendlyGirls']?.setValue(this.InstitutionList[0].functionalCWSNFriendlyGirls);
          this.InstitutionForm.controls['urinalBoys']?.setValue(this.InstitutionList[0].urinalBoys);
          this.InstitutionForm.controls['urinalGirls']?.setValue(this.InstitutionList[0].urinalGirls);

          this.InstitutionForm.controls['selectedHandwashNearToilet']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].handwashNearToilet) );
          this.InstitutionForm.controls['selectedHandwashFacilityforMeal']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].handwashFacilityforMeal));
          this.InstitutionForm.controls['selectedDrinkingWaterAvailable']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].drinkingWaterAvailable) );
          this.InstitutionForm.controls['selectedDrinkingWaterFunctional']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].drinkingWaterFunctional) );
          this.InstitutionForm.controls['selectedRainWaterHarvesting']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].rainWaterHarvesting));
          this.InstitutionForm.controls['selectedPlaygroundAvailable']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].playgroundAvailable));


          this.InstitutionForm.controls['noofBuildingsInGoodCondition']?.setValue(this.InstitutionList[0].noofBuildingsInGoodCondition);
          this.InstitutionForm.controls['noofBuildingNeedsMinorRepair']?.setValue(this.InstitutionList[0].noofBuildingNeedsMinorRepair);
          this.InstitutionForm.controls['noofBuildingNeedsMajorRepair']?.setValue(this.InstitutionList[0].noofBuildingNeedsMajorRepair);
          this.InstitutionForm.controls['otherRooms']?.setValue(this.InstitutionList[0].otherRooms);
          this.InstitutionForm.controls['selectedLibraryAvailability']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].libraryAvailability));
          this.InstitutionForm.controls['selectedSeparateRoomforHM']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].separateRoomforHM));
          this.InstitutionForm.controls['selectedFurnitureAvailability']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].furnitureAvailability));
          this.InstitutionForm.controls['selectedElectricityAvailability']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].electricityAvailability));
          this.InstitutionForm.controls['selectedSolarPanel']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].solarPanel));
          this.InstitutionForm.controls['selectedMedicalcheckups']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].medicalcheckups));

          this.InstitutionForm.controls['selectedICTLab']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].ictLab));
          this.InstitutionForm.controls['selectedInternetConnection']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].internetConnection));
          this.InstitutionForm.controls['selectedDTHConnection']?.setValue(this.PrePrimaryList.find(app => app.labelId == this.InstitutionList[0].dthConnection));
          this.InstitutionForm.controls['noofDesktop']?.setValue(this.InstitutionList[0].noofDesktop);
          this.InstitutionForm.controls['noofLaptop']?.setValue(this.InstitutionList[0].noofLaptop);
          this.InstitutionForm.controls['noofTablet']?.setValue(this.InstitutionList[0].noofTablet);
          this.InstitutionForm.controls['noofPrinter']?.setValue(this.InstitutionList[0].noofPrinter);
          this.InstitutionForm.controls['noofProjector']?.setValue(this.InstitutionList[0].noofProjector);
          this.InstitutionForm.controls['noofDigiBoard']?.setValue(this.InstitutionList[0].noofDigiBoard);

          this.InstitutionForm.controls['noofTeachersPrimary']?.setValue(this.InstitutionList[0].noofTeachersPrimary);
          this.InstitutionForm.controls['noofTeachersPrimaryandUpperPrimary']?.setValue(this.InstitutionList[0].noofTeachersPrimaryandUpperPrimary);
          this.InstitutionForm.controls['noofTeachersHigerSecondaryOnly']?.setValue(this.InstitutionList[0].noofTeachersHigerSecondaryOnly);
          this.InstitutionForm.controls['noofTeachersSecondaryandHigerSecondary']?.setValue(this.InstitutionList[0].noofTeachersSecondaryandHigerSecondary);
          this.InstitutionForm.controls['noofTeachersPrePrimaryandPrimary']?.setValue(this.InstitutionList[0].noofTeachersPrePrimaryandPrimary);
          this.InstitutionForm.controls['noofTeachersUpperPrimary']?.setValue(this.InstitutionList[0].noofTeachersUpperPrimary);
          this.InstitutionForm.controls['noofTeachersSecondaryOnly']?.setValue(this.InstitutionList[0].noofTeachersSecondaryOnly);
          this.InstitutionForm.controls['noofTeachersUpperPrimaryandSecondary']?.setValue(this.InstitutionList[0].noofTeachersUpperPrimaryandSecondary);
          this.InstitutionForm.controls['noofTeachersPrePrimaryOnly']?.setValue(this.InstitutionList[0].noofTeachersPrePrimaryOnly);
          this.InstitutionForm.controls['noofTeachersRegular']?.setValue(this.InstitutionList[0].noofTeachersRegular);
          this.InstitutionForm.controls['noofTeachersParttime']?.setValue(this.InstitutionList[0].noofTeachersParttime);
          this.InstitutionForm.controls['noofTeachersContract']?.setValue(this.InstitutionList[0].noofTeachersContract);
          this.InstitutionForm.controls['noofTeachersMale']?.setValue(this.InstitutionList[0].noofTeachersMale);
          this.InstitutionForm.controls['noofTeachersFemale']?.setValue(this.InstitutionList[0].noofTeachersFemale);
          this.InstitutionForm.controls['noofTeachersTransgender']?.setValue(this.InstitutionList[0].noofTeachersTransgender);
          this.InstitutionForm.controls['totalNoofTeachers']?.setValue(this.InstitutionList[0].totalNoofTeachers);
          this.InstitutionForm.controls['noofTotalTeacherReceivedServiceTraining']?.setValue(this.InstitutionList[0].noofTotalTeacherReceivedServiceTraining);
          this.InstitutionForm.controls['totalTeacherInvolveinNonTeachingAssignment']?.setValue(this.InstitutionList[0].totalTeacherInvolveinNonTeachingAssignment);
          this.InstitutionForm.controls['noofTeachersBelowGraduate']?.setValue(this.InstitutionList[0].noofTeachersBelowGraduate);
          this.InstitutionForm.controls['noofTeachersGraduate']?.setValue(this.InstitutionList[0].noofTeachersGraduate);
          this.InstitutionForm.controls['noofTeachersPostGraduateandAbove']?.setValue(this.InstitutionList[0].noofTeachersPostGraduateandAbove);
          this.InstitutionForm.controls['noofTotalTeachersTrainedinComputer']?.setValue(this.InstitutionList[0].noofTotalTeachersTrainedinComputer);
          this.InstitutionForm.controls['noofTeachersAgedAbove55']?.setValue(this.InstitutionList[0].noofTeachersAgedAbove55);
          this.InstitutionForm.controls['noofTeachersDiplomaorCertificateinbasicteacherstraining']?.setValue(this.InstitutionList[0].noofTeachersDiplomaorCertificateinbasicteacherstraining);
          this.InstitutionForm.controls['noofTeachersBachelorofElementaryEducation']?.setValue(this.InstitutionList[0].noofTeachersBachelorofElementaryEducation);
          this.InstitutionForm.controls['noofTeachersBEdorEquivalent']?.setValue(this.InstitutionList[0].noofTeachersBEdorEquivalent);
          this.InstitutionForm.controls['noofTeachersMEdorEquivalent']?.setValue(this.InstitutionList[0].noofTeachersMEdorEquivalent);
          this.InstitutionForm.controls['noofTeachersDiplomaorDegreeinSpecialEducation']?.setValue(this.InstitutionList[0].noofTeachersDiplomaorDegreeinSpecialEducation);
          this.InstitutionForm.controls['noofTeachersPursuinganyRelevantProfessionalCourse']?.setValue(this.InstitutionList[0].noofTeachersPursuinganyRelevantProfessionalCourse);

          this.IsUpdate = true;
          this.buttonText = "Update";
        }

        // Process the data here
      } catch (error) {
        // Handle error
      }
    }
    //#endregion


    console.log('Edit',this.InstitutionForm)

  }



  private LoadInstitutionsData() {

    try {

      this.fiscalService.getInstituionsData().then((result: any) => {

        console.log('LoadInstitutionsData', result.institutionsData.orgList);

        this.OrganizationList = result.institutionsData.orgList;
        this.LocationList = result.institutionsData.locList;
        this.SchoolCategoryList = result.institutionsData.categoryList;

        this.StateManagementList = result.institutionsData.smList;
        this.NationalManagementList = result.institutionsData.nmList;
        this.SchoolTypeList = result.institutionsData.typeList;
        this.MediumofInstructionList = result.institutionsData.instructionList;
        this.BoardList = result.institutionsData.boardList;

        this.BuildingStatusList = result.institutionsData.buildingList;
        this.BoundarywallList = result.institutionsData.boundaryList;
      });

    } catch (error) {
      console.error('Error fetching data in component:', error);
    }

  }




  public LoadInstitutionsData_V2() {

    try {

      this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.DATA)
        .subscribe({
          next: (result: any) => {

              this.OrganizationList = result.institutionsData.orgList;
              this.LocationList = result.institutionsData.locList;
              this.SchoolCategoryList = result.institutionsData.categoryList;

              this.StateManagementList = result.institutionsData.smList;
              this.NationalManagementList = result.institutionsData.nmList;
              this.SchoolTypeList = result.institutionsData.typeList;
              this.MediumofInstructionList = result.institutionsData.instructionList;
              this.BoardList = result.institutionsData.boardList;

              this.BuildingStatusList = result.institutionsData.buildingList;
              this.BoundarywallList = result.institutionsData.boundaryList;

          }

        });

    } catch (error) {
      console.error('Error fetching data in component:', error);
    }

  }
 

  filterOrganization(event: AutoCompleteCompleteEvent) {

    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.OrganizationList as any[]).length; i++) {
      let _organizationList = (this.OrganizationList as any[])[i];
      if (_organizationList.organization.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_organizationList);
      }
    }
    this.filteredOrganization = filtered;
  }

  onSelectOrganization(){
    console.log(this.InstitutionForm.value['selectedOrganization'])
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

        passSaveParams.institutionId = this.InstitutionId;
        passSaveParams.organizationId = this.InstitutionForm.value['selectedOrganization'] != null ? +(this.InstitutionForm.value['selectedOrganization'].organizationId) : 0;
        passSaveParams.name = this.InstitutionForm.value['institutionName'] != null ? this.InstitutionForm.value['institutionName'] : '';
        passSaveParams.shortName = this.InstitutionForm.value['shortName'] != null ? this.InstitutionForm.value['shortName'] : '';
        passSaveParams.udiseCode = this.InstitutionForm.value['udiseCode'] != null ? this.InstitutionForm.value['udiseCode'] : '';

        passSaveParams.stateId = this.InstitutionForm.value['selectedState'] != null ? +(this.InstitutionForm.value['selectedState'].stateId) : 0;
        passSaveParams.city = this.InstitutionForm.value['city'] != null ? this.InstitutionForm.value['city'] : '';
        passSaveParams.block = this.InstitutionForm.value['block'] != null ? this.InstitutionForm.value['block'] : '';
        passSaveParams.locationId = this.InstitutionForm.value['selectedLocation'] != null ? +(this.InstitutionForm.value['selectedLocation'].locationId) : 0;
        passSaveParams.cluster = this.InstitutionForm.value['cluster'] != null ? this.InstitutionForm.value['cluster'] : '';
        passSaveParams.ward = this.InstitutionForm.value['ward'] != null ? this.InstitutionForm.value['ward'] : '';
        passSaveParams.mahalla = this.InstitutionForm.value['mahalla'] != null ? this.InstitutionForm.value['mahalla'] : '';
        passSaveParams.pinCode = this.InstitutionForm.value['pinCode'] != null ? +(this.InstitutionForm.value['pinCode']) : 0;
        passSaveParams.panchayat = this.InstitutionForm.value['panchayat'] != null ? this.InstitutionForm.value['panchayat'] : '';
        passSaveParams.municipality = this.InstitutionForm.value['municipality'] != null ? this.InstitutionForm.value['municipality'] : '';
        passSaveParams.schoolCategoryId = this.InstitutionForm.value['selectedCategory'] != null ? +(this.InstitutionForm.value['selectedCategory'].categoryId) : 0;
        passSaveParams.stateManagementId = this.InstitutionForm.value['stateManagement'] != null ? +(this.InstitutionForm.value['stateManagement'].stateManagementId) : 0;
        passSaveParams.nationalManagementId = this.InstitutionForm.value['nationalManagement'] != null ? +(this.InstitutionForm.value['nationalManagement'].nationalManagementId) : 0;
        passSaveParams.schoolTypeId = this.InstitutionForm.value['selectedSchoolType'] != null ? +(this.InstitutionForm.value['selectedSchoolType'].typeId) : 0;
        passSaveParams.classFrom = this.InstitutionForm.value['classFrom'] != null ? +(this.InstitutionForm.value['classFrom']) : 0;
        passSaveParams.classTo = this.InstitutionForm.value['classTo'] != null ? +(this.InstitutionForm.value['classTo']) : 0;
        passSaveParams.isPrePrimary = this.InstitutionForm.value['selectedPrePrimary'] != null ? this.InstitutionForm.value['selectedPrePrimary'].labelId : false;
        passSaveParams.mediumofInstruction = this.InstitutionForm.value['selectedMedium'] != null ? +(this.InstitutionForm.value['selectedMedium'].instructionId) : 0;
        passSaveParams.boardId = this.InstitutionForm.value['selectedBoard'] != null ? +(this.InstitutionForm.value['selectedBoard'].boardId) : 0;


        passSaveParams.regAddress1 = this.InstitutionForm.value['regAddress1'] != null ? this.InstitutionForm.value['regAddress1'] : '';
        passSaveParams.regAddress2 = this.InstitutionForm.value['regAddress2'] != null ? this.InstitutionForm.value['regAddress2'] : '';
        passSaveParams.regAddress3 = this.InstitutionForm.value['regAddress3'] != null ? this.InstitutionForm.value['regAddress3'] : '';
        passSaveParams.regAddress4 = this.InstitutionForm.value['regAddress4'] != null ? this.InstitutionForm.value['regAddress4'] : '';
        passSaveParams.regCity = this.InstitutionForm.value['regCity'] != null ? this.InstitutionForm.value['regCity'] : '';
        passSaveParams.regStateId = this.InstitutionForm.value['regSelectedState'] != null ? +(this.InstitutionForm.value['regSelectedState'].stateId) : 0;
        passSaveParams.regCountryId = this.InstitutionForm.value['regSelectedCountry'] != null ? +(this.InstitutionForm.value['regSelectedCountry'].countryId) : 0;
        passSaveParams.regPINCode = this.InstitutionForm.value['regPINCode'] != null ? +(this.InstitutionForm.value['regPINCode']) : 0;
        passSaveParams.mobileNumber1 = this.InstitutionForm.value['mobileNumber1'] != null ? this.InstitutionForm.value['mobileNumber1'] : '';
        passSaveParams.mobileNumber2 = this.InstitutionForm.value['mobileNumber2'] != null ? this.InstitutionForm.value['mobileNumber2'] : '';
        passSaveParams.phoneNumber1 = this.InstitutionForm.value['phoneNumber1'] != null ? this.InstitutionForm.value['phoneNumber1'] : '';
        passSaveParams.phoneNumber2 = this.InstitutionForm.value['phoneNumber2'] != null ? this.InstitutionForm.value['phoneNumber2'] : '';
        passSaveParams.fax = this.InstitutionForm.value['fax'] != null ? this.InstitutionForm.value['fax'] : '';
        passSaveParams.primaryEmail = this.InstitutionForm.value['primaryEmail'] != null ? this.InstitutionForm.value['primaryEmail'] : '';
        passSaveParams.secondaryEmail = this.InstitutionForm.value['secondaryEmail'] != null ? this.InstitutionForm.value['secondaryEmail'] : '';
        passSaveParams.website = this.InstitutionForm.value['website'] != null ? this.InstitutionForm.value['website'] : '';


        passSaveParams.yearofEstablishment = this.InstitutionForm.value['yearofEstablishment'] != null ? +(this.InstitutionForm.value['yearofEstablishment']) : 0;
        passSaveParams.yearofRecognitionPrimary = this.InstitutionForm.value['yearofRecognitionPrimary'] != null ? +(this.InstitutionForm.value['yearofRecognitionPrimary']) : 0;
        passSaveParams.yearofRecognitionUpperPrimary = this.InstitutionForm.value['yearofRecognitionUpperPrimary'] != null ? +(this.InstitutionForm.value['yearofRecognitionUpperPrimary']) : 0;
        passSaveParams.yearofRecognitionSecondary = this.InstitutionForm.value['yearofRecognitionSecondary'] != null ? +(this.InstitutionForm.value['yearofRecognitionSecondary']) : 0;
        passSaveParams.yearofRecognitionHigherSecondary = this.InstitutionForm.value['yearofRecognitionHigherSecondary'] != null ? +(this.InstitutionForm.value['yearofRecognitionHigherSecondary']) : 0;
        passSaveParams.affiliationBoardSecondary = this.InstitutionForm.value['affiliationBoardSecondary'] != null ? +(this.InstitutionForm.value['affiliationBoardSecondary']) : 0;
        passSaveParams.affiliationBoardHigherSecondary = this.InstitutionForm.value['affiliationBoardHigherSecondary'] != null ? +(this.InstitutionForm.value['affiliationBoardHigherSecondary']) : 0;



        passSaveParams.isMinoritySchool = this.InstitutionForm.value['selectedMinoritySchool'] != null ? this.InstitutionForm.value['selectedMinoritySchool'].labelId : false;
        passSaveParams.isthisaShiftSchool = this.InstitutionForm.value['selectedIsthisaShiftSchool'] != null ? this.InstitutionForm.value['selectedIsthisaShiftSchool'].labelId : false;
        passSaveParams.buildingStatusId = this.InstitutionForm.value['selectedBuildingStatus'] != null ? +(this.InstitutionForm.value['selectedBuildingStatus'].buildingStatusId) : 0;
        passSaveParams.boundaryWallId = this.InstitutionForm.value['selectedBoundaryWall'] != null ? this.InstitutionForm.value['selectedBoundaryWall'].boundaryWallId : 0;
        passSaveParams.noofBuildingBlocks = this.InstitutionForm.value['noofBuildingBlocks'] != null ? +(this.InstitutionForm.value['noofBuildingBlocks']) : 0;
        passSaveParams.noofPuccaBuildingBlocks = this.InstitutionForm.value['noofPuccaBuildingBlocks'] != null ? +(this.InstitutionForm.value['noofPuccaBuildingBlocks']) : 0;
        passSaveParams.isSpecialSchoolforCWSN = this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'] != null ? this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'].labelId : false;
        passSaveParams.availabilityofRamps = this.InstitutionForm.value['selectedAvailabilityofRamps'] != null ? this.InstitutionForm.value['selectedAvailabilityofRamps'].labelId : false;
        passSaveParams.availabilityofHandrails = this.InstitutionForm.value['selectedAvailabilityofHandrails'] != null ? this.InstitutionForm.value['selectedAvailabilityofHandrails'].labelId : false;


        passSaveParams.totalNoOfToiletsBoys = this.InstitutionForm.value['totalNoOfToiletsBoys'] != null ? +(this.InstitutionForm.value['totalNoOfToiletsBoys']) : 0;
        passSaveParams.totalNoOfToiletsGirls = this.InstitutionForm.value['totalNoOfToiletsGirls'] != null ? +(this.InstitutionForm.value['totalNoOfToiletsGirls']) : 0;
        passSaveParams.functionalBoys = this.InstitutionForm.value['functionalBoys'] != null ? +(this.InstitutionForm.value['functionalBoys']) : 0;
        passSaveParams.functionalGirls = this.InstitutionForm.value['functionalGirls'] != null ? +(this.InstitutionForm.value['functionalGirls']) : 0;
        passSaveParams.functionalCWSNFriendlyBoys = this.InstitutionForm.value['functionalCWSNFriendlyBoys'] != null ? +(this.InstitutionForm.value['functionalCWSNFriendlyBoys']) : 0;
        passSaveParams.functionalCWSNFriendlyGirls = this.InstitutionForm.value['functionalCWSNFriendlyGirls'] != null ? +(this.InstitutionForm.value['functionalCWSNFriendlyGirls']) : 0;
        passSaveParams.urinalBoys = this.InstitutionForm.value['urinalBoys'] != null ? +(this.InstitutionForm.value['urinalBoys']) : 0;
        passSaveParams.urinalGirls = this.InstitutionForm.value['urinalGirls'] != null ? +(this.InstitutionForm.value['urinalGirls']) : 0;
        passSaveParams.handwashNearToilet = this.InstitutionForm.value['selectedHandwashNearToilet'] != null ? this.InstitutionForm.value['selectedHandwashNearToilet'].labelId : false;
        passSaveParams.handwashFacilityforMeal = this.InstitutionForm.value['selectedHandwashFacilityforMeal'] != null ? this.InstitutionForm.value['selectedHandwashFacilityforMeal'].labelId : false;
        passSaveParams.drinkingWaterAvailable = this.InstitutionForm.value['selectedDrinkingWaterAvailable'] != null ? this.InstitutionForm.value['selectedDrinkingWaterAvailable'].labelId : false;
        passSaveParams.drinkingWaterFunctional = this.InstitutionForm.value['selectedDrinkingWaterFunctional'] != null ? this.InstitutionForm.value['selectedDrinkingWaterFunctional'].labelId : false;
        passSaveParams.rainWaterHarvesting = this.InstitutionForm.value['selectedRainWaterHarvesting'] != null ? this.InstitutionForm.value['selectedRainWaterHarvesting'].labelId : false;
        passSaveParams.playgroundAvailable = this.InstitutionForm.value['selectedPlaygroundAvailable'] != null ? this.InstitutionForm.value['selectedPlaygroundAvailable'].labelId : false;


        passSaveParams.noofBuildingsInGoodCondition = this.InstitutionForm.value['noofBuildingsInGoodCondition'] != null ? +(this.InstitutionForm.value['noofBuildingsInGoodCondition']) : 0;
        passSaveParams.noofBuildingNeedsMinorRepair = this.InstitutionForm.value['noofBuildingNeedsMinorRepair'] != null ? +(this.InstitutionForm.value['noofBuildingNeedsMinorRepair']) : 0;
        passSaveParams.noofBuildingNeedsMajorRepair = this.InstitutionForm.value['noofBuildingNeedsMajorRepair'] != null ? +(this.InstitutionForm.value['noofBuildingNeedsMajorRepair']) :0;
        passSaveParams.otherRooms = this.InstitutionForm.value['otherRooms'] != null ? +(this.InstitutionForm.value['otherRooms']) : 0;
        passSaveParams.libraryAvailability = this.InstitutionForm.value['selectedLibraryAvailability'] != null ? this.InstitutionForm.value['selectedLibraryAvailability'].labelId : false;
        passSaveParams.separateRoomforHM = this.InstitutionForm.value['selectedSeparateRoomforHM'] != null ? this.InstitutionForm.value['selectedSeparateRoomforHM'].labelId : false;
        passSaveParams.furnitureAvailability = this.InstitutionForm.value['selectedFurnitureAvailability'] != null ? this.InstitutionForm.value['selectedFurnitureAvailability'].labelId : false;
        passSaveParams.electricityAvailability = this.InstitutionForm.value['selectedElectricityAvailability'] != null ? this.InstitutionForm.value['selectedElectricityAvailability'].labelId : false;
        passSaveParams.solarPanel = this.InstitutionForm.value['selectedSolarPanel'] != null ? this.InstitutionForm.value['selectedSolarPanel'].labelId : false;
        passSaveParams.medicalcheckups = this.InstitutionForm.value['selectedMedicalcheckups'] != null ? this.InstitutionForm.value['selectedMedicalcheckups'].labelId : false;

        passSaveParams.ictLab = this.InstitutionForm.value['selectedICTLab'] != null ? this.InstitutionForm.value['selectedICTLab'].labelId : false;
        passSaveParams.internetConnection = this.InstitutionForm.value['selectedInternetConnection'] != null ? this.InstitutionForm.value['selectedInternetConnection'].labelId : false;
        passSaveParams.dthConnection = this.InstitutionForm.value['selectedDTHConnection'] != null ? this.InstitutionForm.value['selectedDTHConnection'].labelId : false;
        passSaveParams.noofDesktop = this.InstitutionForm.value['noofDesktop'] != null ? +(this.InstitutionForm.value['noofDesktop']) : 0;
        passSaveParams.noofLaptop = this.InstitutionForm.value['noofLaptop'] != null ? +(this.InstitutionForm.value['noofLaptop']) : 0;
        passSaveParams.noofTablet = this.InstitutionForm.value['noofTablet'] != null ? +(this.InstitutionForm.value['noofTablet']) : 0;
        passSaveParams.noofPrinter = this.InstitutionForm.value['noofPrinter'] != null ? +(this.InstitutionForm.value['noofPrinter']) : 0;
        passSaveParams.noofProjector = this.InstitutionForm.value['noofProjector'] != null ? +(this.InstitutionForm.value['noofProjector']) : 0;
        passSaveParams.noofDigiBoard = this.InstitutionForm.value['noofDigiBoard'] != null ? +(this.InstitutionForm.value['noofDigiBoard']) : 0;

        passSaveParams.noofTeachersPrimary = this.InstitutionForm.value['noofTeachersPrimary'] != null ? +(this.InstitutionForm.value['noofTeachersPrimary']) : 0;
        passSaveParams.noofTeachersPrimaryandUpperPrimary = this.InstitutionForm.value['noofTeachersPrimaryandUpperPrimary'] != null ? +(this.InstitutionForm.value['noofTeachersPrimaryandUpperPrimary']) : 0;
        passSaveParams.noofTeachersHigerSecondaryOnly = this.InstitutionForm.value['noofTeachersHigerSecondaryOnly'] != null ? +(this.InstitutionForm.value['noofTeachersHigerSecondaryOnly']) : 0;
        passSaveParams.noofTeachersSecondaryandHigerSecondary = this.InstitutionForm.value['noofTeachersSecondaryandHigerSecondary'] != null ? +(this.InstitutionForm.value['noofTeachersSecondaryandHigerSecondary']) : 0;
        passSaveParams.noofTeachersPrePrimaryandPrimary = this.InstitutionForm.value['noofTeachersPrePrimaryandPrimary'] != null ? +(this.InstitutionForm.value['noofTeachersPrePrimaryandPrimary']) : 0;
        passSaveParams.noofTeachersUpperPrimary = this.InstitutionForm.value['noofTeachersUpperPrimary'] != null ? +(this.InstitutionForm.value['noofTeachersUpperPrimary']) : 0;
        passSaveParams.noofTeachersSecondaryOnly = this.InstitutionForm.value['noofTeachersSecondaryOnly'] != null ? +(this.InstitutionForm.value['noofTeachersSecondaryOnly']) : 0;
        passSaveParams.noofTeachersUpperPrimaryandSecondary = this.InstitutionForm.value['noofTeachersUpperPrimaryandSecondary'] != null ? +(this.InstitutionForm.value['noofTeachersUpperPrimaryandSecondary']) : 0;
        passSaveParams.noofTeachersPrePrimaryOnly = this.InstitutionForm.value['noofTeachersPrePrimaryOnly'] != null ? +(this.InstitutionForm.value['noofTeachersPrePrimaryOnly']) : 0;
        passSaveParams.noofTeachersRegular = this.InstitutionForm.value['noofTeachersRegular'] != null ? +(this.InstitutionForm.value['noofTeachersRegular']) : 0;
        passSaveParams.noofTeachersParttime = this.InstitutionForm.value['noofTeachersParttime'] != null ? +(this.InstitutionForm.value['noofTeachersParttime']) : 0;
        passSaveParams.noofTeachersContract = this.InstitutionForm.value['noofTeachersContract'] != null ? +(this.InstitutionForm.value['noofTeachersContract']) : 0;
        passSaveParams.noofTeachersMale = this.InstitutionForm.value['noofTeachersMale'] != null ? +(this.InstitutionForm.value['noofTeachersMale']) : 0;
        passSaveParams.noofTeachersFemale = this.InstitutionForm.value['noofTeachersFemale'] != null ? +(this.InstitutionForm.value['noofTeachersFemale']) : 0;
        passSaveParams.noofTeachersTransgender = this.InstitutionForm.value['noofTeachersTransgender'] != null ? +(this.InstitutionForm.value['noofTeachersTransgender']) : 0;
        passSaveParams.totalNoofTeachers = this.InstitutionForm.value['totalNoofTeachers'] != null ? +(this.InstitutionForm.value['totalNoofTeachers']) : 0;
        passSaveParams.noofTotalTeacherReceivedServiceTraining = this.InstitutionForm.value['noofTotalTeacherReceivedServiceTraining'] != null ? +(this.InstitutionForm.value['noofTotalTeacherReceivedServiceTraining']) : 0;
        passSaveParams.totalTeacherInvolveinNonTeachingAssignment = this.InstitutionForm.value['totalTeacherInvolveinNonTeachingAssignment'] != null ? +(this.InstitutionForm.value['totalTeacherInvolveinNonTeachingAssignment']) : 0;
        passSaveParams.noofTeachersBelowGraduate = this.InstitutionForm.value['noofTeachersBelowGraduate'] != null ? +(this.InstitutionForm.value['noofTeachersBelowGraduate']) : 0;
        passSaveParams.noofTeachersGraduate = this.InstitutionForm.value['noofTeachersGraduate'] != null ? +(this.InstitutionForm.value['noofTeachersGraduate']) : 0;
        passSaveParams.noofTeachersPostGraduateandAbove = this.InstitutionForm.value['noofTeachersPostGraduateandAbove'] != null ? +(this.InstitutionForm.value['noofTeachersPostGraduateandAbove']) : 0;
        passSaveParams.noofTotalTeachersTrainedinComputer = this.InstitutionForm.value['noofTotalTeachersTrainedinComputer'] != null ? +(this.InstitutionForm.value['noofTotalTeachersTrainedinComputer']) : 0;
        passSaveParams.noofTeachersAgedAbove55 = this.InstitutionForm.value['noofTeachersAgedAbove55'] != null ? +(this.InstitutionForm.value['noofTeachersAgedAbove55']) : 0;
        passSaveParams.noofTeachersDiplomaorCertificateinbasicteacherstraining = this.InstitutionForm.value['noofTeachersDiplomaorCertificateinbasicteacherstraining'] != null ? +(this.InstitutionForm.value['noofTeachersDiplomaorCertificateinbasicteacherstraining']) : 0;
        passSaveParams.noofTeachersBachelorofElementaryEducation = this.InstitutionForm.value['noofTeachersBachelorofElementaryEducation'] != null ? +(this.InstitutionForm.value['noofTeachersBachelorofElementaryEducation']) : 0;
        passSaveParams.noofTeachersBEdorEquivalent = this.InstitutionForm.value['noofTeachersBEdorEquivalent'] != null ? +(this.InstitutionForm.value['noofTeachersBEdorEquivalent']) : 0;
        passSaveParams.noofTeachersMEdorEquivalent = this.InstitutionForm.value['noofTeachersMEdorEquivalent'] != null ? +(this.InstitutionForm.value['noofTeachersMEdorEquivalent']) : 0;
        passSaveParams.noofTeachersDiplomaorDegreeinSpecialEducation = this.InstitutionForm.value['noofTeachersDiplomaorDegreeinSpecialEducation'] != null ? +(this.InstitutionForm.value['noofTeachersDiplomaorDegreeinSpecialEducation']) : 0;
        passSaveParams.noofTeachersPursuinganyRelevantProfessionalCourse = this.InstitutionForm.value['noofTeachersPursuinganyRelevantProfessionalCourse'] != null ? +(this.InstitutionForm.value['noofTeachersPursuinganyRelevantProfessionalCourse']) : 0;

        passSaveParams.isActive = true
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.UPDATE

      }
      else { //  SAVE

        passSaveParams.institutionId = this.InstitutionId;
        passSaveParams.organizationId = this.InstitutionForm.value['selectedOrganization'] != null ? +(this.InstitutionForm.value['selectedOrganization'].organizationId) : 0;
        passSaveParams.name = this.InstitutionForm.value['institutionName'] != null ? this.InstitutionForm.value['institutionName'] : '';
        passSaveParams.shortName = this.InstitutionForm.value['shortName'] != null ? this.InstitutionForm.value['shortName'] : '';
        passSaveParams.udiseCode = this.InstitutionForm.value['udiseCode'] != null ? this.InstitutionForm.value['udiseCode'] : '';

        passSaveParams.stateId = this.InstitutionForm.value['selectedState'] != null ? +(this.InstitutionForm.value['selectedState'].stateId) : 0;
        passSaveParams.city = this.InstitutionForm.value['city'] != null ? this.InstitutionForm.value['city'] : '';
        passSaveParams.block = this.InstitutionForm.value['block'] != null ? this.InstitutionForm.value['block'] : '';
        passSaveParams.locationId = this.InstitutionForm.value['selectedLocation'] != null ? +(this.InstitutionForm.value['selectedLocation'].locationId) : 0;
        passSaveParams.cluster = this.InstitutionForm.value['cluster'] != null ? this.InstitutionForm.value['cluster'] : '';
        passSaveParams.ward = this.InstitutionForm.value['ward'] != null ? this.InstitutionForm.value['ward'] : '';
        passSaveParams.mahalla = this.InstitutionForm.value['mahalla'] != null ? this.InstitutionForm.value['mahalla'] : '';
        passSaveParams.pinCode = this.InstitutionForm.value['pinCode'] != null ? +(this.InstitutionForm.value['pinCode']) : 0;
        passSaveParams.panchayat = this.InstitutionForm.value['panchayat'] != null ? this.InstitutionForm.value['panchayat'] : '';
        passSaveParams.municipality = this.InstitutionForm.value['municipality'] != null ? this.InstitutionForm.value['municipality'] : '';
        passSaveParams.schoolCategoryId = this.InstitutionForm.value['selectedCategory'] != null ? +(this.InstitutionForm.value['selectedCategory'].categoryId) : 0;
        passSaveParams.stateManagementId = this.InstitutionForm.value['stateManagement'] != null ? +(this.InstitutionForm.value['stateManagement'].stateManagementId) : 0;
        passSaveParams.nationalManagementId = this.InstitutionForm.value['nationalManagement'] != null ? +(this.InstitutionForm.value['nationalManagement'].nationalManagementId) : 0;
        passSaveParams.schoolTypeId = this.InstitutionForm.value['selectedSchoolType'] != null ? +(this.InstitutionForm.value['selectedSchoolType'].typeId) : 0;
        passSaveParams.classFrom = this.InstitutionForm.value['classFrom'] != null ? +(this.InstitutionForm.value['classFrom']) : 0;
        passSaveParams.classTo = this.InstitutionForm.value['classTo'] != null ? +(this.InstitutionForm.value['classTo']) : 0;
        passSaveParams.isPrePrimary = this.InstitutionForm.value['selectedPrePrimary'] != null ? this.InstitutionForm.value['selectedPrePrimary'].labelId : false;
        passSaveParams.mediumofInstruction = this.InstitutionForm.value['selectedMedium'] != null ? +(this.InstitutionForm.value['selectedMedium'].instructionId) : 0;
        passSaveParams.boardId = this.InstitutionForm.value['selectedBoard'] != null ? +(this.InstitutionForm.value['selectedBoard'].boardId) : 0;


        passSaveParams.regAddress1 = this.InstitutionForm.value['regAddress1'] != null ? this.InstitutionForm.value['regAddress1'] : '';
        passSaveParams.regAddress2 = this.InstitutionForm.value['regAddress2'] != null ? this.InstitutionForm.value['regAddress2'] : '';
        passSaveParams.regAddress3 = this.InstitutionForm.value['regAddress3'] != null ? this.InstitutionForm.value['regAddress3'] : '';
        passSaveParams.regAddress4 = this.InstitutionForm.value['regAddress4'] != null ? this.InstitutionForm.value['regAddress4'] : '';
        passSaveParams.regCity = this.InstitutionForm.value['regCity'] != null ? this.InstitutionForm.value['regCity'] : '';
        passSaveParams.regStateId = this.InstitutionForm.value['regSelectedState'] != null ? +(this.InstitutionForm.value['regSelectedState'].stateId) : 0;
        passSaveParams.regCountryId = this.InstitutionForm.value['regSelectedCountry'] != null ? +(this.InstitutionForm.value['regSelectedCountry'].countryId) : 0;
        passSaveParams.regPINCode = this.InstitutionForm.value['regPINCode'] != null ? +(this.InstitutionForm.value['regPINCode']) : 0;
        passSaveParams.mobileNumber1 = this.InstitutionForm.value['mobileNumber1'] != null ? this.InstitutionForm.value['mobileNumber1'] : '';
        passSaveParams.mobileNumber2 = this.InstitutionForm.value['mobileNumber2'] != null ? this.InstitutionForm.value['mobileNumber2'] : '';
        passSaveParams.phoneNumber1 = this.InstitutionForm.value['phoneNumber1'] != null ? this.InstitutionForm.value['phoneNumber1'] : '';
        passSaveParams.phoneNumber2 = this.InstitutionForm.value['phoneNumber2'] != null ? this.InstitutionForm.value['phoneNumber2'] : '';
        passSaveParams.fax = this.InstitutionForm.value['fax'] != null ? this.InstitutionForm.value['fax'] : '';
        passSaveParams.primaryEmail = this.InstitutionForm.value['primaryEmail'] != null ? this.InstitutionForm.value['primaryEmail'] : '';
        passSaveParams.secondaryEmail = this.InstitutionForm.value['secondaryEmail'] != null ? this.InstitutionForm.value['secondaryEmail'] : '';
        passSaveParams.website = this.InstitutionForm.value['website'] != null ? this.InstitutionForm.value['website'] : '';


        passSaveParams.yearofEstablishment = this.InstitutionForm.value['yearofEstablishment'] != null ? +(this.InstitutionForm.value['yearofEstablishment']) : 0;
        passSaveParams.yearofRecognitionPrimary = this.InstitutionForm.value['yearofRecognitionPrimary'] != null ? +(this.InstitutionForm.value['yearofRecognitionPrimary']) : 0;
        passSaveParams.yearofRecognitionUpperPrimary = this.InstitutionForm.value['yearofRecognitionUpperPrimary'] != null ? +(this.InstitutionForm.value['yearofRecognitionUpperPrimary']) : 0;
        passSaveParams.yearofRecognitionSecondary = this.InstitutionForm.value['yearofRecognitionSecondary'] != null ? +(this.InstitutionForm.value['yearofRecognitionSecondary']) : 0;
        passSaveParams.yearofRecognitionHigherSecondary = this.InstitutionForm.value['yearofRecognitionHigherSecondary'] != null ? +(this.InstitutionForm.value['yearofRecognitionHigherSecondary']) : 0;
        passSaveParams.affiliationBoardSecondary = this.InstitutionForm.value['affiliationBoardSecondary'] != null ? +(this.InstitutionForm.value['affiliationBoardSecondary']) : 0;
        passSaveParams.affiliationBoardHigherSecondary = this.InstitutionForm.value['affiliationBoardHigherSecondary'] != null ? +(this.InstitutionForm.value['affiliationBoardHigherSecondary']) : 0;

        console.log('selectedBoundaryWall',+(this.InstitutionForm.value['selectedBoundaryWall'].boundaryWallId))

        passSaveParams.isMinoritySchool = this.InstitutionForm.value['selectedMinoritySchool'] != null ? this.InstitutionForm.value['selectedMinoritySchool'].labelId : false;
        passSaveParams.isthisaShiftSchool = this.InstitutionForm.value['selectedIsthisaShiftSchool'] != null ? this.InstitutionForm.value['selectedIsthisaShiftSchool'].labelId : false;
        passSaveParams.buildingStatusId = this.InstitutionForm.value['selectedBuildingStatus'] != null ? +(this.InstitutionForm.value['selectedBuildingStatus'].buildingStatusId) : 0;
        passSaveParams.boundaryWallId = this.InstitutionForm.value['selectedBoundaryWall'] != null ? this.InstitutionForm.value['selectedBoundaryWall'].boundaryWallId : 0;
        passSaveParams.noofBuildingBlocks = this.InstitutionForm.value['noofBuildingBlocks'] != null ? +(this.InstitutionForm.value['noofBuildingBlocks']) : 0;
        passSaveParams.noofPuccaBuildingBlocks = this.InstitutionForm.value['noofPuccaBuildingBlocks'] != null ? +(this.InstitutionForm.value['noofPuccaBuildingBlocks']) : 0;
        passSaveParams.isSpecialSchoolforCWSN = this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'] != null ? this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'].labelId : false;
        passSaveParams.availabilityofRamps = this.InstitutionForm.value['selectedAvailabilityofRamps'] != null ? this.InstitutionForm.value['selectedAvailabilityofRamps'].labelId : false;
        passSaveParams.availabilityofHandrails = this.InstitutionForm.value['selectedAvailabilityofHandrails'] != null ? this.InstitutionForm.value['selectedAvailabilityofHandrails'].labelId : false;


        passSaveParams.totalNoOfToiletsBoys = this.InstitutionForm.value['totalNoOfToiletsBoys'] != null ? +(this.InstitutionForm.value['totalNoOfToiletsBoys']) : 0;
        passSaveParams.totalNoOfToiletsGirls = this.InstitutionForm.value['totalNoOfToiletsGirls'] != null ? +(this.InstitutionForm.value['totalNoOfToiletsGirls']) : 0;
        passSaveParams.functionalBoys = this.InstitutionForm.value['functionalBoys'] != null ? +(this.InstitutionForm.value['functionalBoys']) : 0;
        passSaveParams.functionalGirls = this.InstitutionForm.value['functionalGirls'] != null ? +(this.InstitutionForm.value['functionalGirls']) : 0;
        passSaveParams.functionalCWSNFriendlyBoys = this.InstitutionForm.value['functionalCWSNFriendlyBoys'] != null ? +(this.InstitutionForm.value['functionalCWSNFriendlyBoys']) : 0;
        passSaveParams.functionalCWSNFriendlyGirls = this.InstitutionForm.value['functionalCWSNFriendlyGirls'] != null ? +(this.InstitutionForm.value['functionalCWSNFriendlyGirls']) : 0;
        passSaveParams.urinalBoys = this.InstitutionForm.value['urinalBoys'] != null ? +(this.InstitutionForm.value['urinalBoys']) : 0;
        passSaveParams.urinalGirls = this.InstitutionForm.value['urinalGirls'] != null ? +(this.InstitutionForm.value['urinalGirls']) : 0;
        passSaveParams.handwashNearToilet = this.InstitutionForm.value['selectedHandwashNearToilet'] != null ? this.InstitutionForm.value['selectedHandwashNearToilet'].labelId : false;
        passSaveParams.handwashFacilityforMeal = this.InstitutionForm.value['selectedHandwashFacilityforMeal'] != null ? this.InstitutionForm.value['selectedHandwashFacilityforMeal'].labelId : false;
        passSaveParams.drinkingWaterAvailable = this.InstitutionForm.value['selectedDrinkingWaterAvailable'] != null ? this.InstitutionForm.value['selectedDrinkingWaterAvailable'].labelId : false;
        passSaveParams.drinkingWaterFunctional = this.InstitutionForm.value['selectedDrinkingWaterFunctional'] != null ? this.InstitutionForm.value['selectedDrinkingWaterFunctional'].labelId : false;
        passSaveParams.rainWaterHarvesting = this.InstitutionForm.value['selectedRainWaterHarvesting'] != null ? this.InstitutionForm.value['selectedRainWaterHarvesting'].labelId : false;
        passSaveParams.playgroundAvailable = this.InstitutionForm.value['selectedPlaygroundAvailable'] != null ? this.InstitutionForm.value['selectedPlaygroundAvailable'].labelId : false;


        passSaveParams.noofBuildingsInGoodCondition = this.InstitutionForm.value['noofBuildingsInGoodCondition'] != null ? +(this.InstitutionForm.value['noofBuildingsInGoodCondition']) : 0;
        passSaveParams.noofBuildingNeedsMinorRepair = this.InstitutionForm.value['noofBuildingNeedsMinorRepair'] != null ? +(this.InstitutionForm.value['noofBuildingNeedsMinorRepair']) : 0;
        passSaveParams.noofBuildingNeedsMajorRepair = this.InstitutionForm.value['noofBuildingNeedsMajorRepair'] != null ? +(this.InstitutionForm.value['noofBuildingNeedsMajorRepair']) :0;
        passSaveParams.otherRooms = this.InstitutionForm.value['otherRooms'] != null ? +(this.InstitutionForm.value['otherRooms']) : 0;
        passSaveParams.libraryAvailability = this.InstitutionForm.value['selectedLibraryAvailability'] != null ? this.InstitutionForm.value['selectedLibraryAvailability'].labelId : false;
        passSaveParams.separateRoomforHM = this.InstitutionForm.value['selectedSeparateRoomforHM'] != null ? this.InstitutionForm.value['selectedSeparateRoomforHM'].labelId : false;
        passSaveParams.furnitureAvailability = this.InstitutionForm.value['selectedFurnitureAvailability'] != null ? this.InstitutionForm.value['selectedFurnitureAvailability'].labelId : false;
        passSaveParams.electricityAvailability = this.InstitutionForm.value['selectedElectricityAvailability'] != null ? this.InstitutionForm.value['selectedElectricityAvailability'].labelId : false;
        passSaveParams.solarPanel = this.InstitutionForm.value['selectedSolarPanel'] != null ? this.InstitutionForm.value['selectedSolarPanel'].labelId : false;
        passSaveParams.medicalcheckups = this.InstitutionForm.value['selectedMedicalcheckups'] != null ? this.InstitutionForm.value['selectedMedicalcheckups'].labelId : false;

        passSaveParams.ictLab = this.InstitutionForm.value['selectedICTLab'] != null ? this.InstitutionForm.value['selectedICTLab'].labelId : false;
        passSaveParams.internetConnection = this.InstitutionForm.value['selectedInternetConnection'] != null ? this.InstitutionForm.value['selectedInternetConnection'].labelId : false;
        passSaveParams.dthConnection = this.InstitutionForm.value['selectedDTHConnection'] != null ? this.InstitutionForm.value['selectedDTHConnection'].labelId : false;
        passSaveParams.noofDesktop = this.InstitutionForm.value['noofDesktop'] != null ? +(this.InstitutionForm.value['noofDesktop']) : 0;
        passSaveParams.noofLaptop = this.InstitutionForm.value['noofLaptop'] != null ? +(this.InstitutionForm.value['noofLaptop']) : 0;
        passSaveParams.noofTablet = this.InstitutionForm.value['noofTablet'] != null ? +(this.InstitutionForm.value['noofTablet']) : 0;
        passSaveParams.noofPrinter = this.InstitutionForm.value['noofPrinter'] != null ? +(this.InstitutionForm.value['noofPrinter']) : 0;
        passSaveParams.noofProjector = this.InstitutionForm.value['noofProjector'] != null ? +(this.InstitutionForm.value['noofProjector']) : 0;
        passSaveParams.noofDigiBoard = this.InstitutionForm.value['noofDigiBoard'] != null ? +(this.InstitutionForm.value['noofDigiBoard']) : 0;

        passSaveParams.noofTeachersPrimary = this.InstitutionForm.value['noofTeachersPrimary'] != null ? +(this.InstitutionForm.value['noofTeachersPrimary']) : 0;
        passSaveParams.noofTeachersPrimaryandUpperPrimary = this.InstitutionForm.value['noofTeachersPrimaryandUpperPrimary'] != null ? +(this.InstitutionForm.value['noofTeachersPrimaryandUpperPrimary']) : 0;
        passSaveParams.noofTeachersHigerSecondaryOnly = this.InstitutionForm.value['noofTeachersHigerSecondaryOnly'] != null ? +(this.InstitutionForm.value['noofTeachersHigerSecondaryOnly']) : 0;
        passSaveParams.noofTeachersSecondaryandHigerSecondary = this.InstitutionForm.value['noofTeachersSecondaryandHigerSecondary'] != null ? +(this.InstitutionForm.value['noofTeachersSecondaryandHigerSecondary']) : 0;
        passSaveParams.noofTeachersPrePrimaryandPrimary = this.InstitutionForm.value['noofTeachersPrePrimaryandPrimary'] != null ? +(this.InstitutionForm.value['noofTeachersPrePrimaryandPrimary']) : 0;
        passSaveParams.noofTeachersUpperPrimary = this.InstitutionForm.value['noofTeachersUpperPrimary'] != null ? +(this.InstitutionForm.value['noofTeachersUpperPrimary']) : 0;
        passSaveParams.noofTeachersSecondaryOnly = this.InstitutionForm.value['noofTeachersSecondaryOnly'] != null ? +(this.InstitutionForm.value['noofTeachersSecondaryOnly']) : 0;
        passSaveParams.noofTeachersUpperPrimaryandSecondary = this.InstitutionForm.value['noofTeachersUpperPrimaryandSecondary'] != null ? +(this.InstitutionForm.value['noofTeachersUpperPrimaryandSecondary']) : 0;
        passSaveParams.noofTeachersPrePrimaryOnly = this.InstitutionForm.value['noofTeachersPrePrimaryOnly'] != null ? +(this.InstitutionForm.value['noofTeachersPrePrimaryOnly']) : 0;
        passSaveParams.noofTeachersRegular = this.InstitutionForm.value['noofTeachersRegular'] != null ? +(this.InstitutionForm.value['noofTeachersRegular']) : 0;
        passSaveParams.noofTeachersParttime = this.InstitutionForm.value['noofTeachersParttime'] != null ? +(this.InstitutionForm.value['noofTeachersParttime']) : 0;
        passSaveParams.noofTeachersContract = this.InstitutionForm.value['noofTeachersContract'] != null ? +(this.InstitutionForm.value['noofTeachersContract']) : 0;
        passSaveParams.noofTeachersMale = this.InstitutionForm.value['noofTeachersMale'] != null ? +(this.InstitutionForm.value['noofTeachersMale']) : 0;
        passSaveParams.noofTeachersFemale = this.InstitutionForm.value['noofTeachersFemale'] != null ? +(this.InstitutionForm.value['noofTeachersFemale']) : 0;
        passSaveParams.noofTeachersTransgender = this.InstitutionForm.value['noofTeachersTransgender'] != null ? +(this.InstitutionForm.value['noofTeachersTransgender']) : 0;
        passSaveParams.totalNoofTeachers = this.InstitutionForm.value['totalNoofTeachers'] != null ? +(this.InstitutionForm.value['totalNoofTeachers']) : 0;
        passSaveParams.noofTotalTeacherReceivedServiceTraining = this.InstitutionForm.value['noofTotalTeacherReceivedServiceTraining'] != null ? +(this.InstitutionForm.value['noofTotalTeacherReceivedServiceTraining']) : 0;
        passSaveParams.totalTeacherInvolveinNonTeachingAssignment = this.InstitutionForm.value['totalTeacherInvolveinNonTeachingAssignment'] != null ? +(this.InstitutionForm.value['totalTeacherInvolveinNonTeachingAssignment']) : 0;
        passSaveParams.noofTeachersBelowGraduate = this.InstitutionForm.value['noofTeachersBelowGraduate'] != null ? +(this.InstitutionForm.value['noofTeachersBelowGraduate']) : 0;
        passSaveParams.noofTeachersGraduate = this.InstitutionForm.value['noofTeachersGraduate'] != null ? +(this.InstitutionForm.value['noofTeachersGraduate']) : 0;
        passSaveParams.noofTeachersPostGraduateandAbove = this.InstitutionForm.value['noofTeachersPostGraduateandAbove'] != null ? +(this.InstitutionForm.value['noofTeachersPostGraduateandAbove']) : 0;
        passSaveParams.noofTotalTeachersTrainedinComputer = this.InstitutionForm.value['noofTotalTeachersTrainedinComputer'] != null ? +(this.InstitutionForm.value['noofTotalTeachersTrainedinComputer']) : 0;
        passSaveParams.noofTeachersAgedAbove55 = this.InstitutionForm.value['noofTeachersAgedAbove55'] != null ? +(this.InstitutionForm.value['noofTeachersAgedAbove55']) : 0;
        passSaveParams.noofTeachersDiplomaorCertificateinbasicteacherstraining = this.InstitutionForm.value['noofTeachersDiplomaorCertificateinbasicteacherstraining'] != null ? +(this.InstitutionForm.value['noofTeachersDiplomaorCertificateinbasicteacherstraining']) : 0;
        passSaveParams.noofTeachersBachelorofElementaryEducation = this.InstitutionForm.value['noofTeachersBachelorofElementaryEducation'] != null ? +(this.InstitutionForm.value['noofTeachersBachelorofElementaryEducation']) : 0;
        passSaveParams.noofTeachersBEdorEquivalent = this.InstitutionForm.value['noofTeachersBEdorEquivalent'] != null ? +(this.InstitutionForm.value['noofTeachersBEdorEquivalent']) : 0;
        passSaveParams.noofTeachersMEdorEquivalent = this.InstitutionForm.value['noofTeachersMEdorEquivalent'] != null ? +(this.InstitutionForm.value['noofTeachersMEdorEquivalent']) : 0;
        passSaveParams.noofTeachersDiplomaorDegreeinSpecialEducation = this.InstitutionForm.value['noofTeachersDiplomaorDegreeinSpecialEducation'] != null ? +(this.InstitutionForm.value['noofTeachersDiplomaorDegreeinSpecialEducation']) : 0;
        passSaveParams.noofTeachersPursuinganyRelevantProfessionalCourse = this.InstitutionForm.value['noofTeachersPursuinganyRelevantProfessionalCourse'] != null ? +(this.InstitutionForm.value['noofTeachersPursuinganyRelevantProfessionalCourse']) : 0;


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
    if (this.InstitutionForm.value['regSelectedState'] != undefined && this.InstitutionForm.value['regSelectedState'] != null) {
      let _countryId: number = this.InstitutionForm.value['regSelectedState'].countryId;
      this.InstitutionForm.get("regSelectedCountry")?.setValue(this.CoutryList.find(c => c.countryId === _countryId))

    } else {
      this.InstitutionForm.get("regSelectedCountry")?.setValue(null);
    }
  }

  onClearState() {
    console.log('onClearState', this.InstitutionForm);
    this.InstitutionForm.get("regSelectedCountry")?.reset();
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

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
    yearofRecognition_Primary: null,
    yearofRecognition_UpperPrimary: null,
    yearofRecognition_Secondary: null,
    yearofRecognition_HigherSecondary: null,
    affiliationBoard_Secondary: null,
    affiliationBoard_HigherSecondary: null,
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
    totalNoOfToilets_Boys: null,
    totalNoOfToilets_Girls: null,
    functional_Boys: null,
    functional_Girls: null,
    functionalCWSNFriendly_Boys: null,
    functionalCWSNFriendly_Girls: null,
    urinal_Boys: null,
    urinal_Girls: null,
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
    iCTLab: null,
    selectedICTLab: { label: 'Yes', labelId: true },
    internetConnection: null,
    selectedInternetConnection: { label: 'Yes', labelId: true },
    dTHConnection: null,
    selectedDTHConnection: { label: 'No', labelId: false },
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

    this.GetStates();
    this.GetCountries();

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


    if (this.InstitutionId != undefined && this.InstitutionId != 0) {
      try {
        const data = await this.fiscalService.fetchInstitutionById(this.InstitutionId);
        
        this.InstitutionList = data.institutions;
        console.log('Data from backend - fetchInstitutionById:', this.InstitutionList);

        if (this.InstitutionList != undefined && this.InstitutionList.length > 0) {

          this.InstitutionId = this.InstitutionList[0].institutionId;

          console.log(JSON.stringify(this.SchoolCategoryList.find(app => app.categoryId === this.InstitutionList[0].schoolCategoryId)));

          this.InstitutionId = this.InstitutionList[0].institutionId;
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
          this.InstitutionForm.controls['yearofRecognition_Primary']?.setValue(this.InstitutionList[0].yearofRecognition_Primary);
          this.InstitutionForm.controls['yearofRecognition_UpperPrimary']?.setValue(this.InstitutionList[0].yearofRecognition_UpperPrimary);
          this.InstitutionForm.controls['yearofRecognition_Secondary']?.setValue(this.InstitutionList[0].yearofRecognition_Secondary);
          this.InstitutionForm.controls['yearofRecognition_HigherSecondary']?.setValue(this.InstitutionList[0].yearofRecognition_HigherSecondary);
          this.InstitutionForm.controls['affiliationBoard_Secondary']?.setValue(this.InstitutionList[0].affiliationBoard_Secondary);
          this.InstitutionForm.controls['affiliationBoard_HigherSecondary']?.setValue(this.InstitutionList[0].affiliationBoard_HigherSecondary);
          this.InstitutionForm.controls['selectedMinoritySchool']?.setValue(this.InstitutionList[0].selectedMinoritySchool);
          this.InstitutionForm.controls['selectedIsthisaShiftSchool']?.setValue(this.InstitutionList[0].selectedIsthisaShiftSchool);
          this.InstitutionForm.controls['selectedBuildingStatus']?.setValue(this.InstitutionList[0].selectedBuildingStatus);
          this.InstitutionForm.controls['selectedBoundaryWall']?.setValue(this.InstitutionList[0].selectedBoundaryWall);
          this.InstitutionForm.controls['noofBuildingBlocks']?.setValue(this.InstitutionList[0].noofBuildingBlocks);
          this.InstitutionForm.controls['noofPuccaBuildingBlocks']?.setValue(this.InstitutionList[0].noofPuccaBuildingBlocks);
          this.InstitutionForm.controls['selectedIsSpecialSchoolforCWSN']?.setValue(this.InstitutionList[0].selectedIsSpecialSchoolforCWSN);
          this.InstitutionForm.controls['selectedAvailabilityofRamps']?.setValue(this.InstitutionList[0].selectedAvailabilityofRamps);
          this.InstitutionForm.controls['selectedAvailabilityofHandrails']?.setValue(this.InstitutionList[0].selectedAvailabilityofHandrails);


          this.InstitutionForm.controls['totalNoOfToilets_Boys']?.setValue(this.InstitutionList[0].totalNoOfToilets_Boys);
          this.InstitutionForm.controls['totalNoOfToilets_Girls']?.setValue(this.InstitutionList[0].totalNoOfToilets_Girls);
          this.InstitutionForm.controls['functional_Boys']?.setValue(this.InstitutionList[0].functional_Boys);
          this.InstitutionForm.controls['functional_Girls']?.setValue(this.InstitutionList[0].functional_Girls);
          this.InstitutionForm.controls['functionalCWSNFriendly_Boys']?.setValue(this.InstitutionList[0].functionalCWSNFriendly_Boys);
          this.InstitutionForm.controls['functionalCWSNFriendly_Girls']?.setValue(this.InstitutionList[0].functionalCWSNFriendly_Girls);
          this.InstitutionForm.controls['urinal_Boys']?.setValue(this.InstitutionList[0].urinal_Boys);
          this.InstitutionForm.controls['urinal_Girls']?.setValue(this.InstitutionList[0].urinal_Girls);
          this.InstitutionForm.controls['selectedHandwashNearToilet']?.setValue(this.InstitutionList[0].selectedHandwashNearToilet);
          this.InstitutionForm.controls['selectedHandwashFacilityforMeal']?.setValue(this.InstitutionList[0].selectedHandwashFacilityforMeal);
          this.InstitutionForm.controls['selectedDrinkingWaterAvailable']?.setValue(this.InstitutionList[0].selectedDrinkingWaterAvailable);
          this.InstitutionForm.controls['selectedDrinkingWaterFunctional']?.setValue(this.InstitutionList[0].selectedDrinkingWaterFunctional);
          this.InstitutionForm.controls['selectedRainWaterHarvesting']?.setValue(this.InstitutionList[0].selectedRainWaterHarvesting);
          this.InstitutionForm.controls['selectedPlaygroundAvailable']?.setValue(this.InstitutionList[0].selectedPlaygroundAvailable);


          this.InstitutionForm.controls['noofBuildingsInGoodCondition']?.setValue(this.InstitutionList[0].noofBuildingsInGoodCondition);
          this.InstitutionForm.controls['noofBuildingNeedsMinorRepair']?.setValue(this.InstitutionList[0].noofBuildingNeedsMinorRepair);
          this.InstitutionForm.controls['noofBuildingNeedsMajorRepair']?.setValue(this.InstitutionList[0].noofBuildingNeedsMajorRepair);
          this.InstitutionForm.controls['otherRooms']?.setValue(this.InstitutionList[0].otherRooms);
          this.InstitutionForm.controls['selectedLibraryAvailability']?.setValue(this.InstitutionList[0].selectedLibraryAvailability);
          this.InstitutionForm.controls['selectedSeparateRoomforHM']?.setValue(this.InstitutionList[0].selectedSeparateRoomforHM);
          this.InstitutionForm.controls['selectedFurnitureAvailability']?.setValue(this.InstitutionList[0].selectedFurnitureAvailability);
          this.InstitutionForm.controls['selectedElectricityAvailability']?.setValue(this.InstitutionList[0].selectedElectricityAvailability);
          this.InstitutionForm.controls['selectedSolarPanel']?.setValue(this.InstitutionList[0].selectedSolarPanel);
          this.InstitutionForm.controls['selectedMedicalcheckups']?.setValue(this.InstitutionList[0].selectedMedicalcheckups);

          this.InstitutionForm.controls['selectedICTLab']?.setValue(this.InstitutionList[0].selectedICTLab);
          this.InstitutionForm.controls['selectedInternetConnection']?.setValue(this.InstitutionList[0].selectedInternetConnection);
          this.InstitutionForm.controls['selectedDTHConnection']?.setValue(this.InstitutionList[0].selectedDTHConnection);
          this.InstitutionForm.controls['noofDesktop']?.setValue(this.InstitutionList[0].noofDesktop);
          this.InstitutionForm.controls['noofLaptop']?.setValue(this.InstitutionList[0].noofLaptop);
          this.InstitutionForm.controls['noofTablet']?.setValue(this.InstitutionList[0].noofTablet);
          this.InstitutionForm.controls['noofPrinter']?.setValue(this.InstitutionList[0].noofPrinter);
          this.InstitutionForm.controls['noofProjector']?.setValue(this.InstitutionList[0].noofProjector);
          this.InstitutionForm.controls['noofDigiBoard']?.setValue(this.InstitutionList[0].noofDigiBoard);

          this.InstitutionForm.controls['noofTeachers_Primary']?.setValue(this.InstitutionList[0].noofTeachers_Primary);
          this.InstitutionForm.controls['noofTeachers_PrimaryandUpperPrimary']?.setValue(this.InstitutionList[0].noofTeachers_PrimaryandUpperPrimary);
          this.InstitutionForm.controls['noofTeachers_HigerSecondaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_HigerSecondaryOnly);
          this.InstitutionForm.controls['noofTeachers_SecondaryandHigerSecondary']?.setValue(this.InstitutionList[0].noofTeachers_SecondaryandHigerSecondary);
          this.InstitutionForm.controls['noofTeachers_PrePrimaryandPrimary']?.setValue(this.InstitutionList[0].noofTeachers_PrePrimaryandPrimary);
          this.InstitutionForm.controls['noofTeachers_UpperPrimary']?.setValue(this.InstitutionList[0].noofTeachers_UpperPrimary);
          this.InstitutionForm.controls['noofTeachers_SecondaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_SecondaryOnly);
          this.InstitutionForm.controls['noofTeachers_UpperPrimaryandSecondary']?.setValue(this.InstitutionList[0].noofTeachers_UpperPrimaryandSecondary);
          this.InstitutionForm.controls['noofTeachers_PrePrimaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_PrePrimaryOnly);
          this.InstitutionForm.controls['noofTeachers_Regular']?.setValue(this.InstitutionList[0].noofTeachers_Regular);
          this.InstitutionForm.controls['noofTeachers_Parttime']?.setValue(this.InstitutionList[0].noofTeachers_Parttime);
          this.InstitutionForm.controls['noofTeachers_Contract']?.setValue(this.InstitutionList[0].noofTeachers_Contract);
          this.InstitutionForm.controls['noofTeachers_Male']?.setValue(this.InstitutionList[0].noofTeachers_Male);
          this.InstitutionForm.controls['noofTeachers_Female']?.setValue(this.InstitutionList[0].noofTeachers_Female);
          this.InstitutionForm.controls['noofTeachers_Transgender']?.setValue(this.InstitutionList[0].noofTeachers_Transgender);
          this.InstitutionForm.controls['totalNoofTeachers']?.setValue(this.InstitutionList[0].totalNoofTeachers);
          this.InstitutionForm.controls['noofTotalTeacherReceivedServiceTraining']?.setValue(this.InstitutionList[0].noofTotalTeacherReceivedServiceTraining);
          this.InstitutionForm.controls['totalTeacherInvolveinNonTeachingAssignment']?.setValue(this.InstitutionList[0].totalTeacherInvolveinNonTeachingAssignment);
          this.InstitutionForm.controls['noofTeachers_BelowGraduate']?.setValue(this.InstitutionList[0].noofTeachers_BelowGraduate);
          this.InstitutionForm.controls['noofTeachers_Graduate']?.setValue(this.InstitutionList[0].noofTeachers_Graduate);
          this.InstitutionForm.controls['noofTeachers_PostGraduateandAbove']?.setValue(this.InstitutionList[0].noofTeachers_PostGraduateandAbove);
          this.InstitutionForm.controls['noofTotalTeachersTrainedinComputer']?.setValue(this.InstitutionList[0].noofTotalTeachersTrainedinComputer);
          this.InstitutionForm.controls['noofTeachers_AgedAbove55']?.setValue(this.InstitutionList[0].noofTeachers_AgedAbove55);
          this.InstitutionForm.controls['noofTeachers_DiplomaorCertificateinbasicteacherstraining']?.setValue(this.InstitutionList[0].noofTeachers_DiplomaorCertificateinbasicteacherstraining);
          this.InstitutionForm.controls['noofTeachers_BachelorofElementaryEducation']?.setValue(this.InstitutionList[0].noofTeachers_BachelorofElementaryEducation);
          this.InstitutionForm.controls['noofTeachers_BEdorEquivalent']?.setValue(this.InstitutionList[0].noofTeachers_BEdorEquivalent);
          this.InstitutionForm.controls['noofTeachers_MEdorEquivalent']?.setValue(this.InstitutionList[0].noofTeachers_MEdorEquivalent);
          this.InstitutionForm.controls['noofTeachers_DiplomaorDegreeinSpecialEducation']?.setValue(this.InstitutionList[0].noofTeachers_DiplomaorDegreeinSpecialEducation);
          this.InstitutionForm.controls['noofTeachers_PursuinganyRelevantProfessionalCourse']?.setValue(this.InstitutionList[0].noofTeachers_PursuinganyRelevantProfessionalCourse);

          this.IsUpdate = true;
          this.buttonText = "Update";
        }

        // Process the data here
      } catch (error) {       
        // Handle error
      }
    }

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


  public GetInstitutionById() {

    try {

      this.fiscalService.GetInstitutionById({ institutionId: this.InstitutionId }).then(result => {


        console.log("GetInstitutionById",result);

        this.InstitutionList = result.institutions;

        if (this.InstitutionList != undefined && this.InstitutionList.length > 0) {

          this.InstitutionId = this.InstitutionList[0].institutionId;

          console.log(JSON.stringify(this.SchoolCategoryList.find(app => app.categoryId === this.InstitutionList[0].schoolCategoryId)));

          this.InstitutionId = this.InstitutionList[0].institutionId;
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
          this.InstitutionForm.controls['yearofRecognition_Primary']?.setValue(this.InstitutionList[0].yearofRecognition_Primary);
          this.InstitutionForm.controls['yearofRecognition_UpperPrimary']?.setValue(this.InstitutionList[0].yearofRecognition_UpperPrimary);
          this.InstitutionForm.controls['yearofRecognition_Secondary']?.setValue(this.InstitutionList[0].yearofRecognition_Secondary);
          this.InstitutionForm.controls['yearofRecognition_HigherSecondary']?.setValue(this.InstitutionList[0].yearofRecognition_HigherSecondary);
          this.InstitutionForm.controls['affiliationBoard_Secondary']?.setValue(this.InstitutionList[0].affiliationBoard_Secondary);
          this.InstitutionForm.controls['affiliationBoard_HigherSecondary']?.setValue(this.InstitutionList[0].affiliationBoard_HigherSecondary);
          this.InstitutionForm.controls['selectedMinoritySchool']?.setValue(this.InstitutionList[0].selectedMinoritySchool);
          this.InstitutionForm.controls['selectedIsthisaShiftSchool']?.setValue(this.InstitutionList[0].selectedIsthisaShiftSchool);
          this.InstitutionForm.controls['selectedBuildingStatus']?.setValue(this.InstitutionList[0].selectedBuildingStatus);
          this.InstitutionForm.controls['selectedBoundaryWall']?.setValue(this.InstitutionList[0].selectedBoundaryWall);
          this.InstitutionForm.controls['noofBuildingBlocks']?.setValue(this.InstitutionList[0].noofBuildingBlocks);
          this.InstitutionForm.controls['noofPuccaBuildingBlocks']?.setValue(this.InstitutionList[0].noofPuccaBuildingBlocks);
          this.InstitutionForm.controls['selectedIsSpecialSchoolforCWSN']?.setValue(this.InstitutionList[0].selectedIsSpecialSchoolforCWSN);
          this.InstitutionForm.controls['selectedAvailabilityofRamps']?.setValue(this.InstitutionList[0].selectedAvailabilityofRamps);
          this.InstitutionForm.controls['selectedAvailabilityofHandrails']?.setValue(this.InstitutionList[0].selectedAvailabilityofHandrails);


          this.InstitutionForm.controls['totalNoOfToilets_Boys']?.setValue(this.InstitutionList[0].totalNoOfToilets_Boys);
          this.InstitutionForm.controls['totalNoOfToilets_Girls']?.setValue(this.InstitutionList[0].totalNoOfToilets_Girls);
          this.InstitutionForm.controls['functional_Boys']?.setValue(this.InstitutionList[0].functional_Boys);
          this.InstitutionForm.controls['functional_Girls']?.setValue(this.InstitutionList[0].functional_Girls);
          this.InstitutionForm.controls['functionalCWSNFriendly_Boys']?.setValue(this.InstitutionList[0].functionalCWSNFriendly_Boys);
          this.InstitutionForm.controls['functionalCWSNFriendly_Girls']?.setValue(this.InstitutionList[0].functionalCWSNFriendly_Girls);
          this.InstitutionForm.controls['urinal_Boys']?.setValue(this.InstitutionList[0].urinal_Boys);
          this.InstitutionForm.controls['urinal_Girls']?.setValue(this.InstitutionList[0].urinal_Girls);
          this.InstitutionForm.controls['selectedHandwashNearToilet']?.setValue(this.InstitutionList[0].selectedHandwashNearToilet);
          this.InstitutionForm.controls['selectedHandwashFacilityforMeal']?.setValue(this.InstitutionList[0].selectedHandwashFacilityforMeal);
          this.InstitutionForm.controls['selectedDrinkingWaterAvailable']?.setValue(this.InstitutionList[0].selectedDrinkingWaterAvailable);
          this.InstitutionForm.controls['selectedDrinkingWaterFunctional']?.setValue(this.InstitutionList[0].selectedDrinkingWaterFunctional);
          this.InstitutionForm.controls['selectedRainWaterHarvesting']?.setValue(this.InstitutionList[0].selectedRainWaterHarvesting);
          this.InstitutionForm.controls['selectedPlaygroundAvailable']?.setValue(this.InstitutionList[0].selectedPlaygroundAvailable);


          this.InstitutionForm.controls['noofBuildingsInGoodCondition']?.setValue(this.InstitutionList[0].noofBuildingsInGoodCondition);
          this.InstitutionForm.controls['noofBuildingNeedsMinorRepair']?.setValue(this.InstitutionList[0].noofBuildingNeedsMinorRepair);
          this.InstitutionForm.controls['noofBuildingNeedsMajorRepair']?.setValue(this.InstitutionList[0].noofBuildingNeedsMajorRepair);
          this.InstitutionForm.controls['otherRooms']?.setValue(this.InstitutionList[0].otherRooms);
          this.InstitutionForm.controls['selectedLibraryAvailability']?.setValue(this.InstitutionList[0].selectedLibraryAvailability);
          this.InstitutionForm.controls['selectedSeparateRoomforHM']?.setValue(this.InstitutionList[0].selectedSeparateRoomforHM);
          this.InstitutionForm.controls['selectedFurnitureAvailability']?.setValue(this.InstitutionList[0].selectedFurnitureAvailability);
          this.InstitutionForm.controls['selectedElectricityAvailability']?.setValue(this.InstitutionList[0].selectedElectricityAvailability);
          this.InstitutionForm.controls['selectedSolarPanel']?.setValue(this.InstitutionList[0].selectedSolarPanel);
          this.InstitutionForm.controls['selectedMedicalcheckups']?.setValue(this.InstitutionList[0].selectedMedicalcheckups);

          this.InstitutionForm.controls['selectedICTLab']?.setValue(this.InstitutionList[0].selectedICTLab);
          this.InstitutionForm.controls['selectedInternetConnection']?.setValue(this.InstitutionList[0].selectedInternetConnection);
          this.InstitutionForm.controls['selectedDTHConnection']?.setValue(this.InstitutionList[0].selectedDTHConnection);
          this.InstitutionForm.controls['noofDesktop']?.setValue(this.InstitutionList[0].noofDesktop);
          this.InstitutionForm.controls['noofLaptop']?.setValue(this.InstitutionList[0].noofLaptop);
          this.InstitutionForm.controls['noofTablet']?.setValue(this.InstitutionList[0].noofTablet);
          this.InstitutionForm.controls['noofPrinter']?.setValue(this.InstitutionList[0].noofPrinter);
          this.InstitutionForm.controls['noofProjector']?.setValue(this.InstitutionList[0].noofProjector);
          this.InstitutionForm.controls['noofDigiBoard']?.setValue(this.InstitutionList[0].noofDigiBoard);

          this.InstitutionForm.controls['noofTeachers_Primary']?.setValue(this.InstitutionList[0].noofTeachers_Primary);
          this.InstitutionForm.controls['noofTeachers_PrimaryandUpperPrimary']?.setValue(this.InstitutionList[0].noofTeachers_PrimaryandUpperPrimary);
          this.InstitutionForm.controls['noofTeachers_HigerSecondaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_HigerSecondaryOnly);
          this.InstitutionForm.controls['noofTeachers_SecondaryandHigerSecondary']?.setValue(this.InstitutionList[0].noofTeachers_SecondaryandHigerSecondary);
          this.InstitutionForm.controls['noofTeachers_PrePrimaryandPrimary']?.setValue(this.InstitutionList[0].noofTeachers_PrePrimaryandPrimary);
          this.InstitutionForm.controls['noofTeachers_UpperPrimary']?.setValue(this.InstitutionList[0].noofTeachers_UpperPrimary);
          this.InstitutionForm.controls['noofTeachers_SecondaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_SecondaryOnly);
          this.InstitutionForm.controls['noofTeachers_UpperPrimaryandSecondary']?.setValue(this.InstitutionList[0].noofTeachers_UpperPrimaryandSecondary);
          this.InstitutionForm.controls['noofTeachers_PrePrimaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_PrePrimaryOnly);
          this.InstitutionForm.controls['noofTeachers_Regular']?.setValue(this.InstitutionList[0].noofTeachers_Regular);
          this.InstitutionForm.controls['noofTeachers_Parttime']?.setValue(this.InstitutionList[0].noofTeachers_Parttime);
          this.InstitutionForm.controls['noofTeachers_Contract']?.setValue(this.InstitutionList[0].noofTeachers_Contract);
          this.InstitutionForm.controls['noofTeachers_Male']?.setValue(this.InstitutionList[0].noofTeachers_Male);
          this.InstitutionForm.controls['noofTeachers_Female']?.setValue(this.InstitutionList[0].noofTeachers_Female);
          this.InstitutionForm.controls['noofTeachers_Transgender']?.setValue(this.InstitutionList[0].noofTeachers_Transgender);
          this.InstitutionForm.controls['totalNoofTeachers']?.setValue(this.InstitutionList[0].totalNoofTeachers);
          this.InstitutionForm.controls['noofTotalTeacherReceivedServiceTraining']?.setValue(this.InstitutionList[0].noofTotalTeacherReceivedServiceTraining);
          this.InstitutionForm.controls['totalTeacherInvolveinNonTeachingAssignment']?.setValue(this.InstitutionList[0].totalTeacherInvolveinNonTeachingAssignment);
          this.InstitutionForm.controls['noofTeachers_BelowGraduate']?.setValue(this.InstitutionList[0].noofTeachers_BelowGraduate);
          this.InstitutionForm.controls['noofTeachers_Graduate']?.setValue(this.InstitutionList[0].noofTeachers_Graduate);
          this.InstitutionForm.controls['noofTeachers_PostGraduateandAbove']?.setValue(this.InstitutionList[0].noofTeachers_PostGraduateandAbove);
          this.InstitutionForm.controls['noofTotalTeachersTrainedinComputer']?.setValue(this.InstitutionList[0].noofTotalTeachersTrainedinComputer);
          this.InstitutionForm.controls['noofTeachers_AgedAbove55']?.setValue(this.InstitutionList[0].noofTeachers_AgedAbove55);
          this.InstitutionForm.controls['noofTeachers_DiplomaorCertificateinbasicteacherstraining']?.setValue(this.InstitutionList[0].noofTeachers_DiplomaorCertificateinbasicteacherstraining);
          this.InstitutionForm.controls['noofTeachers_BachelorofElementaryEducation']?.setValue(this.InstitutionList[0].noofTeachers_BachelorofElementaryEducation);
          this.InstitutionForm.controls['noofTeachers_BEdorEquivalent']?.setValue(this.InstitutionList[0].noofTeachers_BEdorEquivalent);
          this.InstitutionForm.controls['noofTeachers_MEdorEquivalent']?.setValue(this.InstitutionList[0].noofTeachers_MEdorEquivalent);
          this.InstitutionForm.controls['noofTeachers_DiplomaorDegreeinSpecialEducation']?.setValue(this.InstitutionList[0].noofTeachers_DiplomaorDegreeinSpecialEducation);
          this.InstitutionForm.controls['noofTeachers_PursuinganyRelevantProfessionalCourse']?.setValue(this.InstitutionList[0].noofTeachers_PursuinganyRelevantProfessionalCourse);

          this.IsUpdate = true;
          this.buttonText = "Update";
        }

      });

    } catch (error) {

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
        passSaveParams.organizationId = this.InstitutionForm.value['selectedOrganization'] != null ? this.InstitutionForm.value['selectedOrganization'].organizationId: 0;
        passSaveParams.name = this.InstitutionForm.value['institutionName'] != null ? this.InstitutionForm.value['institutionName'] : '';
        passSaveParams.shortName = this.InstitutionForm.value['shortName'] != null ? this.InstitutionForm.value['shortName'] : '';
        passSaveParams.udiseCode = this.InstitutionForm.value['udiseCode'] != null ? this.InstitutionForm.value['udiseCode'] : '';


        passSaveParams.stateId = this.InstitutionForm.value['selectedState'] != null ? this.InstitutionForm.value['selectedState'].stateId : 0;
        passSaveParams.city = this.InstitutionForm.value['city'] != null ? this.InstitutionForm.value['city'] : '';
        passSaveParams.block = this.InstitutionForm.value['block'] != null ? this.InstitutionForm.value['block'] : '';
        passSaveParams.locationId = this.InstitutionForm.value['selectedLocation'] != null ? this.InstitutionForm.value['selectedLocation'].locationId : 0;
        passSaveParams.cluster = this.InstitutionForm.value['cluster'] != null ? this.InstitutionForm.value['cluster'] : '';
        passSaveParams.ward = this.InstitutionForm.value['ward'] != null ? this.InstitutionForm.value['ward'] : '';
        passSaveParams.mahalla = this.InstitutionForm.value['mahalla'] != null ? this.InstitutionForm.value['mahalla'] : '';
        passSaveParams.pinCode = this.InstitutionForm.value['pinCode'] != null ? this.InstitutionForm.value['pinCode'] : 0;
        passSaveParams.panchayat = this.InstitutionForm.value['panchayat'] != null ? this.InstitutionForm.value['panchayat'] : '';
        passSaveParams.municipality = this.InstitutionForm.value['municipality'] != null ? this.InstitutionForm.value['municipality'] : '';
        passSaveParams.schoolCategoryId = this.InstitutionForm.value['selectedCategory'] != null ? this.InstitutionForm.value['selectedCategory'].categoryId : 0;
        passSaveParams.stateManagementId = this.InstitutionForm.value['stateManagement'] != null ? this.InstitutionForm.value['stateManagement'].stateManagementId : 0;
        passSaveParams.nationalManagementId = this.InstitutionForm.value['nationalManagement'] != null ? this.InstitutionForm.value['nationalManagement'].nationalManagementId : 0;
        passSaveParams.schoolTypeId = this.InstitutionForm.value['selectedSchoolType'] != null ? this.InstitutionForm.value['selectedSchoolType'].typeId : 0;
        passSaveParams.classFrom = this.InstitutionForm.value['classFrom'] != null ? this.InstitutionForm.value['classFrom'] : 0;
        passSaveParams.classTo = this.InstitutionForm.value['classTo'] != null ? this.InstitutionForm.value['classTo'] : 0;
        passSaveParams.isPrePrimary = this.InstitutionForm.value['selectedPrePrimary'] != null ? this.InstitutionForm.value['selectedPrePrimary'].labelId : false;
        passSaveParams.mediumofInstruction = this.InstitutionForm.value['selectedMedium'] != null ? this.InstitutionForm.value['selectedMedium'].instructionId : 0;
        // passSaveParams.boardId = this.InstitutionForm.value['selectedBoard'] != null ? this.InstitutionForm.value['selectedBoard'].boardId : 0;


        passSaveParams.regAddress1 = this.InstitutionForm.value['regAddress1'] != null ? this.InstitutionForm.value['regAddress1'] : '';
        passSaveParams.regAddress2 = this.InstitutionForm.value['regAddress2'] != null ? this.InstitutionForm.value['regAddress2'] : '';
        passSaveParams.regAddress3 = this.InstitutionForm.value['regAddress3'] != null ? this.InstitutionForm.value['regAddress3'] : '';
        passSaveParams.regAddress4 = this.InstitutionForm.value['regAddress4'] != null ? this.InstitutionForm.value['regAddress4'] : '';
        passSaveParams.regCity = this.InstitutionForm.value['regCity'] != null ? this.InstitutionForm.value['regCity'] : '';
        passSaveParams.regStateId = this.InstitutionForm.value['regSelectedState'] != null ? this.InstitutionForm.value['regSelectedState'].stateId : 0;
        passSaveParams.regCountryId = this.InstitutionForm.value['regSelectedCountry'] != null ? this.InstitutionForm.value['regSelectedCountry'].countryId : 0;
        passSaveParams.regPINCode = this.InstitutionForm.value['regPINCode'] != null ? this.InstitutionForm.value['regPINCode'] : 0;
        passSaveParams.mobileNumber1 = this.InstitutionForm.value['mobileNumber1'] != null ? this.InstitutionForm.value['mobileNumber1'] : '';
        passSaveParams.mobileNumber2 = this.InstitutionForm.value['mobileNumber2'] != null ? this.InstitutionForm.value['mobileNumber2'] : '';
        passSaveParams.phoneNumber1 = this.InstitutionForm.value['phoneNumber1'] != null ? this.InstitutionForm.value['phoneNumber1'] : '';
        passSaveParams.phoneNumber2 = this.InstitutionForm.value['phoneNumber2'] != null ? this.InstitutionForm.value['phoneNumber2'] : '';
        passSaveParams.fax = this.InstitutionForm.value['fax'] != null ? this.InstitutionForm.value['fax'] : '';
        passSaveParams.primaryEmail = this.InstitutionForm.value['primaryEmail'] != null ? this.InstitutionForm.value['primaryEmail'] : '';
        passSaveParams.secondaryEmail = this.InstitutionForm.value['secondaryEmail'] != null ? this.InstitutionForm.value['secondaryEmail'] : '';
        passSaveParams.website = this.InstitutionForm.value['website'] != null ? this.InstitutionForm.value['website'] : '';


        passSaveParams.yearofEstablishment = this.InstitutionForm.value['yearofEstablishment'] != null ? this.InstitutionForm.value['yearofEstablishment'] : 0;
        passSaveParams.yearofRecognition_Primary = this.InstitutionForm.value['yearofRecognition_Primary'] != null ? this.InstitutionForm.value['yearofRecognition_Primary'] : 0;
        passSaveParams.yearofRecognition_UpperPrimary = this.InstitutionForm.value['yearofRecognition_UpperPrimary'] != null ? this.InstitutionForm.value['yearofRecognition_UpperPrimary'] : 0;
        passSaveParams.yearofRecognition_Secondary = this.InstitutionForm.value['yearofRecognition_Secondary'] != null ? this.InstitutionForm.value['yearofRecognition_Secondary'] : 0;
        passSaveParams.yearofRecognition_HigherSecondary = this.InstitutionForm.value['yearofRecognition_HigherSecondary'] != null ? this.InstitutionForm.value['yearofRecognition_HigherSecondary'] : 0;
        passSaveParams.affiliationBoard_Secondary = this.InstitutionForm.value['affiliationBoard_Secondary'] != null ? this.InstitutionForm.value['affiliationBoard_Secondary'] : 0;
        passSaveParams.affiliationBoard_HigherSecondary = this.InstitutionForm.value['affiliationBoard_HigherSecondary'] != null ? this.InstitutionForm.value['affiliationBoard_HigherSecondary'] : 0;
        passSaveParams.isMinoritySchool = this.InstitutionForm.value['selectedMinoritySchool'] != null ? this.InstitutionForm.value['selectedMinoritySchool'].labelId : false;
        passSaveParams.isthisaShiftSchool = this.InstitutionForm.value['selectedIsthisaShiftSchool'] != null ? this.InstitutionForm.value['selectedIsthisaShiftSchool'].labelId : false;
        passSaveParams.buildingStatusId = this.InstitutionForm.value['selectedBuildingStatus'] != null ? this.InstitutionForm.value['selectedBuildingStatus'].labelId : false;
        passSaveParams.boundaryWallId = this.InstitutionForm.value['selectedBoundaryWall'] != null ? this.InstitutionForm.value['selectedBoundaryWall'].labelId : false;
        passSaveParams.noofBuildingBlocks = this.InstitutionForm.value['noofBuildingBlocks'] != null ? this.InstitutionForm.value['noofBuildingBlocks'] : 0;
        passSaveParams.noofPuccaBuildingBlocks = this.InstitutionForm.value['noofPuccaBuildingBlocks'] != null ? this.InstitutionForm.value['noofPuccaBuildingBlocks'] : 0;
        passSaveParams.isSpecialSchoolforCWSN = this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'] != null ? this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'].labelId : false;
        passSaveParams.availabilityofRamps = this.InstitutionForm.value['selectedAvailabilityofRamps'] != null ? this.InstitutionForm.value['selectedAvailabilityofRamps'].labelId : false;
        passSaveParams.availabilityofHandrails = this.InstitutionForm.value['selectedAvailabilityofHandrails'] != null ? this.InstitutionForm.value['selectedAvailabilityofHandrails'].labelId : false;


        passSaveParams.totalNoOfToilets_Boys = this.InstitutionForm.value['totalNoOfToilets_Boys'] != null ? this.InstitutionForm.value['totalNoOfToilets_Boys'] : 0;
        passSaveParams.totalNoOfToilets_Girls = this.InstitutionForm.value['totalNoOfToilets_Girls'] != null ? this.InstitutionForm.value['totalNoOfToilets_Girls'] : 0;
        passSaveParams.functional_Boys = this.InstitutionForm.value['functional_Boys'] != null ? this.InstitutionForm.value['functional_Boys'] : 0;
        passSaveParams.functional_Girls = this.InstitutionForm.value['functional_Girls'] != null ? this.InstitutionForm.value['functional_Girls'] : 0;
        passSaveParams.functionalCWSNFriendly_Boys = this.InstitutionForm.value['functionalCWSNFriendly_Boys'] != null ? this.InstitutionForm.value['functionalCWSNFriendly_Boys'] : 0;
        passSaveParams.functionalCWSNFriendly_Girls = this.InstitutionForm.value['functionalCWSNFriendly_Girls'] != null ? this.InstitutionForm.value['functionalCWSNFriendly_Girls'] : 0;
        passSaveParams.urinal_Boys = this.InstitutionForm.value['urinal_Boys'] != null ? this.InstitutionForm.value['urinal_Boys'] : 0;
        passSaveParams.urinal_Girls = this.InstitutionForm.value['urinal_Girls'] != null ? this.InstitutionForm.value['urinal_Girls'] : 0;
        passSaveParams.handwashNearToilet = this.InstitutionForm.value['selectedHandwashNearToilet'] != null ? this.InstitutionForm.value['selectedHandwashNearToilet'].labelId : false;
        passSaveParams.handwashFacilityforMeal = this.InstitutionForm.value['selectedHandwashFacilityforMeal'] != null ? this.InstitutionForm.value['selectedHandwashFacilityforMeal'].labelId : false;
        passSaveParams.drinkingWaterAvailable = this.InstitutionForm.value['selectedDrinkingWaterAvailable'] != null ? this.InstitutionForm.value['selectedDrinkingWaterAvailable'].labelId : false;
        passSaveParams.drinkingWaterFunctional = this.InstitutionForm.value['selectedDrinkingWaterFunctional'] != null ? this.InstitutionForm.value['selectedDrinkingWaterFunctional'].labelId : false;
        passSaveParams.rainWaterHarvesting = this.InstitutionForm.value['selectedRainWaterHarvesting'] != null ? this.InstitutionForm.value['selectedRainWaterHarvesting'].labelId : false;
        passSaveParams.playgroundAvailable = this.InstitutionForm.value['selectedPlaygroundAvailable'] != null ? this.InstitutionForm.value['selectedPlaygroundAvailable'].labelId : false;


        passSaveParams.noofBuildingsInGoodCondition = this.InstitutionForm.value['noofBuildingsInGoodCondition'] != null ? this.InstitutionForm.value['noofBuildingsInGoodCondition'] : 0;
        passSaveParams.noofBuildingNeedsMinorRepair = this.InstitutionForm.value['noofBuildingNeedsMinorRepair'] != null ? this.InstitutionForm.value['noofBuildingNeedsMinorRepair'] : 0;
        passSaveParams.noofBuildingNeedsMajorRepair = this.InstitutionForm.value['noofBuildingNeedsMajorRepair'] != null ? this.InstitutionForm.value['noofBuildingNeedsMajorRepair'] :0;
        passSaveParams.otherRooms = this.InstitutionForm.value['otherRooms'] != null ? this.InstitutionForm.value['otherRooms'] : 0;
        passSaveParams.libraryAvailability = this.InstitutionForm.value['selectedLibraryAvailability'] != null ? this.InstitutionForm.value['selectedLibraryAvailability'].labelId : false;
        passSaveParams.separateRoomforHM = this.InstitutionForm.value['selectedSeparateRoomforHM'] != null ? this.InstitutionForm.value['selectedSeparateRoomforHM'].labelId : false;
        passSaveParams.furnitureAvailability = this.InstitutionForm.value['selectedFurnitureAvailability'] != null ? this.InstitutionForm.value['selectedFurnitureAvailability'].labelId : false;
        passSaveParams.electricityAvailability = this.InstitutionForm.value['selectedElectricityAvailability'] != null ? this.InstitutionForm.value['selectedElectricityAvailability'].labelId : false;
        passSaveParams.solarPanel = this.InstitutionForm.value['selectedSolarPanel'] != null ? this.InstitutionForm.value['selectedSolarPanel'].labelId : false;
        passSaveParams.medicalcheckups = this.InstitutionForm.value['selectedMedicalcheckups'] != null ? this.InstitutionForm.value['selectedMedicalcheckups'].labelId : false;

        passSaveParams.ictLab = this.InstitutionForm.value['selectedICTLab'] != null ? this.InstitutionForm.value['selectedICTLab'].labelId : false;
        passSaveParams.internetConnection = this.InstitutionForm.value['selectedInternetConnection'] != null ? this.InstitutionForm.value['selectedInternetConnection'].labelId : false;
        passSaveParams.dthConnection = this.InstitutionForm.value['selectedDTHConnection'] != null ? this.InstitutionForm.value['selectedDTHConnection'].labelId : false;
        passSaveParams.noofDesktop = this.InstitutionForm.value['noofDesktop'] != null ? this.InstitutionForm.value['noofDesktop'] : 0;
        passSaveParams.noofLaptop = this.InstitutionForm.value['noofLaptop'] != null ? this.InstitutionForm.value['noofLaptop'] : 0;
        passSaveParams.noofTablet = this.InstitutionForm.value['noofTablet'] != null ? this.InstitutionForm.value['noofTablet'] : 0;
        passSaveParams.noofPrinter = this.InstitutionForm.value['noofPrinter'] != null ? this.InstitutionForm.value['noofPrinter'] : 0;
        passSaveParams.noofProjector = this.InstitutionForm.value['noofProjector'] != null ? this.InstitutionForm.value['noofProjector'] : 0;
        passSaveParams.noofDigiBoard = this.InstitutionForm.value['noofDigiBoard'] != null ? this.InstitutionForm.value['noofDigiBoard'] : 0;

        passSaveParams.noofTeachers_Primary = this.InstitutionForm.value['noofTeachers_Primary'] != null ? this.InstitutionForm.value['noofTeachers_Primary'] : 0;
        passSaveParams.noofTeachers_PrimaryandUpperPrimary = this.InstitutionForm.value['noofTeachers_PrimaryandUpperPrimary'] != null ? this.InstitutionForm.value['noofTeachers_PrimaryandUpperPrimary'] : 0;
        passSaveParams.noofTeachers_HigerSecondaryOnly = this.InstitutionForm.value['noofTeachers_HigerSecondaryOnly'] != null ? this.InstitutionForm.value['noofTeachers_HigerSecondaryOnly'] : 0;
        passSaveParams.noofTeachers_SecondaryandHigerSecondary = this.InstitutionForm.value['noofTeachers_SecondaryandHigerSecondary'] != null ? this.InstitutionForm.value['noofTeachers_SecondaryandHigerSecondary']: 0;
        passSaveParams.noofTeachers_PrePrimaryandPrimary = this.InstitutionForm.value['noofTeachers_PrePrimaryandPrimary'] != null ? this.InstitutionForm.value['noofTeachers_PrePrimaryandPrimary'] : 0;
        passSaveParams.noofTeachers_UpperPrimary = this.InstitutionForm.value['noofTeachers_UpperPrimary'] != null ? this.InstitutionForm.value['noofTeachers_UpperPrimary'] : 0;
        passSaveParams.noofTeachers_SecondaryOnly = this.InstitutionForm.value['noofTeachers_SecondaryOnly'] != null ? this.InstitutionForm.value['noofTeachers_SecondaryOnly'] : 0;
        passSaveParams.noofTeachers_UpperPrimaryandSecondary = this.InstitutionForm.value['noofTeachers_UpperPrimaryandSecondary'] != null ? this.InstitutionForm.value['noofTeachers_UpperPrimaryandSecondary']: 0;
        passSaveParams.noofTeachers_PrePrimaryOnly = this.InstitutionForm.value['noofTeachers_PrePrimaryOnly'] != null ? this.InstitutionForm.value['noofTeachers_PrePrimaryOnly']: 0;
        passSaveParams.noofTeachers_Regular = this.InstitutionForm.value['noofTeachers_Regular'] != null ? this.InstitutionForm.value['noofTeachers_Regular'] : 0;
        passSaveParams.noofTeachers_Parttime = this.InstitutionForm.value['noofTeachers_Parttime'] != null ? this.InstitutionForm.value['noofTeachers_Parttime'] : 0;
        passSaveParams.noofTeachers_Contract = this.InstitutionForm.value['noofTeachers_Contract'] != null ? this.InstitutionForm.value['noofTeachers_Contract']: 0;
        passSaveParams.noofTeachers_Male = this.InstitutionForm.value['noofTeachers_Male'] != null ? this.InstitutionForm.value['noofTeachers_Male'] : 0;
        passSaveParams.noofTeachers_Female = this.InstitutionForm.value['noofTeachers_Female'] != null ? this.InstitutionForm.value['noofTeachers_Female'] : 0;
        passSaveParams.noofTeachers_Transgender = this.InstitutionForm.value['noofTeachers_Transgender'] != null ? this.InstitutionForm.value['noofTeachers_Transgender'] : 0;
        passSaveParams.totalNoofTeachers = this.InstitutionForm.value['totalNoofTeachers'] != null ? this.InstitutionForm.value['totalNoofTeachers']: 0;
        passSaveParams.noofTotalTeacherReceivedServiceTraining = this.InstitutionForm.value['noofTotalTeacherReceivedServiceTraining'] != null ? this.InstitutionForm.value['noofTotalTeacherReceivedServiceTraining'] : 0;
        passSaveParams.totalTeacherInvolveinNonTeachingAssignment = this.InstitutionForm.value['totalTeacherInvolveinNonTeachingAssignment'] != null ? this.InstitutionForm.value['totalTeacherInvolveinNonTeachingAssignment'] : 0;
        passSaveParams.noofTeachers_BelowGraduate = this.InstitutionForm.value['noofTeachers_BelowGraduate'] != null ? this.InstitutionForm.value['noofTeachers_BelowGraduate'] : 0;
        passSaveParams.noofTeachers_Graduate = this.InstitutionForm.value['noofTeachers_Graduate'] != null ? this.InstitutionForm.value['noofTeachers_Graduate'] : 0;
        passSaveParams.noofTeachers_PostGraduateandAbove = this.InstitutionForm.value['noofTeachers_PostGraduateandAbove'] != null ? this.InstitutionForm.value['noofTeachers_PostGraduateandAbove'] : 0;
        passSaveParams.noofTotalTeachersTrainedinComputer = this.InstitutionForm.value['noofTotalTeachersTrainedinComputer'] != null ? this.InstitutionForm.value['noofTotalTeachersTrainedinComputer'] : 0;
        passSaveParams.noofTeachers_AgedAbove55 = this.InstitutionForm.value['noofTeachers_AgedAbove55'] != null ? this.InstitutionForm.value['noofTeachers_AgedAbove55'] : 0;
        passSaveParams.noofTeachers_DiplomaorCertificateinbasicteacherstraining = this.InstitutionForm.value['noofTeachers_DiplomaorCertificateinbasicteacherstraining'] != null ? this.InstitutionForm.value['noofTeachers_DiplomaorCertificateinbasicteacherstraining']: 0;
        passSaveParams.noofTeachers_BachelorofElementaryEducation = this.InstitutionForm.value['noofTeachers_BachelorofElementaryEducation'] != null ? this.InstitutionForm.value['noofTeachers_BachelorofElementaryEducation'] : 0;
        passSaveParams.noofTeachers_BEdorEquivalent = this.InstitutionForm.value['noofTeachers_BEdorEquivalent'] != null ? this.InstitutionForm.value['noofTeachers_BEdorEquivalent'] : 0;
        passSaveParams.noofTeachers_MEdorEquivalent = this.InstitutionForm.value['noofTeachers_MEdorEquivalent'] != null ? this.InstitutionForm.value['noofTeachers_MEdorEquivalent'] : 0;
        passSaveParams.noofTeachers_DiplomaorDegreeinSpecialEducation = this.InstitutionForm.value['noofTeachers_DiplomaorDegreeinSpecialEducation'] != null ? this.InstitutionForm.value['noofTeachers_DiplomaorDegreeinSpecialEducation'] : 0;
        passSaveParams.noofTeachers_PursuinganyRelevantProfessionalCourse = this.InstitutionForm.value['noofTeachers_PursuinganyRelevantProfessionalCourse'] != null ? this.InstitutionForm.value['noofTeachers_PursuinganyRelevantProfessionalCourse'] : 0;

        passSaveParams.isActive = true
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.UPDATE

      }
      else { //  SAVE

        passSaveParams.institutionId = this.InstitutionId;
        passSaveParams.organizationId = this.InstitutionForm.value['selectedOrganization'] != null ? this.InstitutionForm.value['selectedOrganization'].organizationId: 0;
        passSaveParams.name = this.InstitutionForm.value['institutionName'] != null ? this.InstitutionForm.value['institutionName'] : '';
        passSaveParams.shortName = this.InstitutionForm.value['shortName'] != null ? this.InstitutionForm.value['shortName'] : '';
        passSaveParams.udiseCode = this.InstitutionForm.value['udiseCode'] != null ? this.InstitutionForm.value['udiseCode'] : '';


        passSaveParams.stateId = this.InstitutionForm.value['selectedState'] != null ? this.InstitutionForm.value['selectedState'].stateId : 0;
        passSaveParams.city = this.InstitutionForm.value['city'] != null ? this.InstitutionForm.value['city'] : '';
        passSaveParams.block = this.InstitutionForm.value['block'] != null ? this.InstitutionForm.value['block'] : '';
        passSaveParams.locationId = this.InstitutionForm.value['selectedLocation'] != null ? this.InstitutionForm.value['selectedLocation'].locationId : 0;
        passSaveParams.cluster = this.InstitutionForm.value['cluster'] != null ? this.InstitutionForm.value['cluster'] : '';
        passSaveParams.ward = this.InstitutionForm.value['ward'] != null ? this.InstitutionForm.value['ward'] : '';
        passSaveParams.mahalla = this.InstitutionForm.value['mahalla'] != null ? this.InstitutionForm.value['mahalla'] : '';
        passSaveParams.pinCode = this.InstitutionForm.value['pinCode'] != null ? this.InstitutionForm.value['pinCode'] : 0;
        passSaveParams.panchayat = this.InstitutionForm.value['panchayat'] != null ? this.InstitutionForm.value['panchayat'] : '';
        passSaveParams.municipality = this.InstitutionForm.value['municipality'] != null ? this.InstitutionForm.value['municipality'] : '';
        passSaveParams.schoolCategoryId = this.InstitutionForm.value['selectedCategory'] != null ? this.InstitutionForm.value['selectedCategory'].categoryId : 0;
        passSaveParams.stateManagementId = this.InstitutionForm.value['stateManagement'] != null ? this.InstitutionForm.value['stateManagement'].stateManagementId : 0;
        passSaveParams.nationalManagementId = this.InstitutionForm.value['nationalManagement'] != null ? this.InstitutionForm.value['nationalManagement'].nationalManagementId : 0;
        passSaveParams.schoolTypeId = this.InstitutionForm.value['selectedSchoolType'] != null ? this.InstitutionForm.value['selectedSchoolType'].typeId : 0;
        passSaveParams.classFrom = this.InstitutionForm.value['classFrom'] != null ? this.InstitutionForm.value['classFrom'] : 0;
        passSaveParams.classTo = this.InstitutionForm.value['classTo'] != null ? this.InstitutionForm.value['classTo'] : 0;
        passSaveParams.isPrePrimary = this.InstitutionForm.value['selectedPrePrimary'] != null ? this.InstitutionForm.value['selectedPrePrimary'].labelId : false;
        passSaveParams.mediumofInstruction = this.InstitutionForm.value['selectedMedium'] != null ? this.InstitutionForm.value['selectedMedium'].instructionId : 0;
        // passSaveParams.boardId = this.InstitutionForm.value['selectedBoard'] != null ? this.InstitutionForm.value['selectedBoard'].boardId : 0;


        passSaveParams.regAddress1 = this.InstitutionForm.value['regAddress1'] != null ? this.InstitutionForm.value['regAddress1'] : '';
        passSaveParams.regAddress2 = this.InstitutionForm.value['regAddress2'] != null ? this.InstitutionForm.value['regAddress2'] : '';
        passSaveParams.regAddress3 = this.InstitutionForm.value['regAddress3'] != null ? this.InstitutionForm.value['regAddress3'] : '';
        passSaveParams.regAddress4 = this.InstitutionForm.value['regAddress4'] != null ? this.InstitutionForm.value['regAddress4'] : '';
        passSaveParams.regCity = this.InstitutionForm.value['regCity'] != null ? this.InstitutionForm.value['regCity'] : '';
        passSaveParams.regStateId = this.InstitutionForm.value['regSelectedState'] != null ? this.InstitutionForm.value['regSelectedState'].stateId : 0;
        passSaveParams.regCountryId = this.InstitutionForm.value['regSelectedCountry'] != null ? this.InstitutionForm.value['regSelectedCountry'].countryId : 0;
        passSaveParams.regPINCode = this.InstitutionForm.value['regPINCode'] != null ? this.InstitutionForm.value['regPINCode'] : 0;
        passSaveParams.mobileNumber1 = this.InstitutionForm.value['mobileNumber1'] != null ? this.InstitutionForm.value['mobileNumber1'] : '';
        passSaveParams.mobileNumber2 = this.InstitutionForm.value['mobileNumber2'] != null ? this.InstitutionForm.value['mobileNumber2'] : '';
        passSaveParams.phoneNumber1 = this.InstitutionForm.value['phoneNumber1'] != null ? this.InstitutionForm.value['phoneNumber1'] : '';
        passSaveParams.phoneNumber2 = this.InstitutionForm.value['phoneNumber2'] != null ? this.InstitutionForm.value['phoneNumber2'] : '';
        passSaveParams.fax = this.InstitutionForm.value['fax'] != null ? this.InstitutionForm.value['fax'] : '';
        passSaveParams.primaryEmail = this.InstitutionForm.value['primaryEmail'] != null ? this.InstitutionForm.value['primaryEmail'] : '';
        passSaveParams.secondaryEmail = this.InstitutionForm.value['secondaryEmail'] != null ? this.InstitutionForm.value['secondaryEmail'] : '';
        passSaveParams.website = this.InstitutionForm.value['website'] != null ? this.InstitutionForm.value['website'] : '';


        passSaveParams.yearofEstablishment = this.InstitutionForm.value['yearofEstablishment'] != null ? this.InstitutionForm.value['yearofEstablishment'] : 0;
        passSaveParams.yearofRecognition_Primary = this.InstitutionForm.value['yearofRecognition_Primary'] != null ? this.InstitutionForm.value['yearofRecognition_Primary'] : 0;
        passSaveParams.yearofRecognition_UpperPrimary = this.InstitutionForm.value['yearofRecognition_UpperPrimary'] != null ? this.InstitutionForm.value['yearofRecognition_UpperPrimary'] : 0;
        passSaveParams.yearofRecognition_Secondary = this.InstitutionForm.value['yearofRecognition_Secondary'] != null ? this.InstitutionForm.value['yearofRecognition_Secondary'] : 0;
        passSaveParams.yearofRecognition_HigherSecondary = this.InstitutionForm.value['yearofRecognition_HigherSecondary'] != null ? this.InstitutionForm.value['yearofRecognition_HigherSecondary'] : 0;
        passSaveParams.affiliationBoard_Secondary = this.InstitutionForm.value['affiliationBoard_Secondary'] != null ? this.InstitutionForm.value['affiliationBoard_Secondary'] : 0;
        passSaveParams.affiliationBoard_HigherSecondary = this.InstitutionForm.value['affiliationBoard_HigherSecondary'] != null ? this.InstitutionForm.value['affiliationBoard_HigherSecondary'] : 0;
        passSaveParams.isMinoritySchool = this.InstitutionForm.value['selectedMinoritySchool'] != null ? this.InstitutionForm.value['selectedMinoritySchool'].labelId : false;
        passSaveParams.isthisaShiftSchool = this.InstitutionForm.value['selectedIsthisaShiftSchool'] != null ? this.InstitutionForm.value['selectedIsthisaShiftSchool'].labelId : false;
        passSaveParams.buildingStatusId = this.InstitutionForm.value['selectedBuildingStatus'] != null ? this.InstitutionForm.value['selectedBuildingStatus'].labelId : false;
        passSaveParams.boundaryWallId = this.InstitutionForm.value['selectedBoundaryWall'] != null ? this.InstitutionForm.value['selectedBoundaryWall'].labelId : false;
        passSaveParams.noofBuildingBlocks = this.InstitutionForm.value['noofBuildingBlocks'] != null ? this.InstitutionForm.value['noofBuildingBlocks'] : 0;
        passSaveParams.noofPuccaBuildingBlocks = this.InstitutionForm.value['noofPuccaBuildingBlocks'] != null ? this.InstitutionForm.value['noofPuccaBuildingBlocks'] : 0;
        passSaveParams.isSpecialSchoolforCWSN = this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'] != null ? this.InstitutionForm.value['selectedIsSpecialSchoolforCWSN'].labelId : false;
        passSaveParams.availabilityofRamps = this.InstitutionForm.value['selectedAvailabilityofRamps'] != null ? this.InstitutionForm.value['selectedAvailabilityofRamps'].labelId : false;
        passSaveParams.availabilityofHandrails = this.InstitutionForm.value['selectedAvailabilityofHandrails'] != null ? this.InstitutionForm.value['selectedAvailabilityofHandrails'].labelId : false;


        passSaveParams.totalNoOfToilets_Boys = this.InstitutionForm.value['totalNoOfToilets_Boys'] != null ? this.InstitutionForm.value['totalNoOfToilets_Boys'] : 0;
        passSaveParams.totalNoOfToilets_Girls = this.InstitutionForm.value['totalNoOfToilets_Girls'] != null ? this.InstitutionForm.value['totalNoOfToilets_Girls'] : 0;
        passSaveParams.functional_Boys = this.InstitutionForm.value['functional_Boys'] != null ? this.InstitutionForm.value['functional_Boys'] : 0;
        passSaveParams.functional_Girls = this.InstitutionForm.value['functional_Girls'] != null ? this.InstitutionForm.value['functional_Girls'] : 0;
        passSaveParams.functionalCWSNFriendly_Boys = this.InstitutionForm.value['functionalCWSNFriendly_Boys'] != null ? this.InstitutionForm.value['functionalCWSNFriendly_Boys'] : 0;
        passSaveParams.functionalCWSNFriendly_Girls = this.InstitutionForm.value['functionalCWSNFriendly_Girls'] != null ? this.InstitutionForm.value['functionalCWSNFriendly_Girls'] : 0;
        passSaveParams.urinal_Boys = this.InstitutionForm.value['urinal_Boys'] != null ? this.InstitutionForm.value['urinal_Boys'] : 0;
        passSaveParams.urinal_Girls = this.InstitutionForm.value['urinal_Girls'] != null ? this.InstitutionForm.value['urinal_Girls'] : 0;
        passSaveParams.handwashNearToilet = this.InstitutionForm.value['selectedHandwashNearToilet'] != null ? this.InstitutionForm.value['selectedHandwashNearToilet'].labelId : false;
        passSaveParams.handwashFacilityforMeal = this.InstitutionForm.value['selectedHandwashFacilityforMeal'] != null ? this.InstitutionForm.value['selectedHandwashFacilityforMeal'].labelId : false;
        passSaveParams.drinkingWaterAvailable = this.InstitutionForm.value['selectedDrinkingWaterAvailable'] != null ? this.InstitutionForm.value['selectedDrinkingWaterAvailable'].labelId : false;
        passSaveParams.drinkingWaterFunctional = this.InstitutionForm.value['selectedDrinkingWaterFunctional'] != null ? this.InstitutionForm.value['selectedDrinkingWaterFunctional'].labelId : false;
        passSaveParams.rainWaterHarvesting = this.InstitutionForm.value['selectedRainWaterHarvesting'] != null ? this.InstitutionForm.value['selectedRainWaterHarvesting'].labelId : false;
        passSaveParams.playgroundAvailable = this.InstitutionForm.value['selectedPlaygroundAvailable'] != null ? this.InstitutionForm.value['selectedPlaygroundAvailable'].labelId : false;


        passSaveParams.noofBuildingsInGoodCondition = this.InstitutionForm.value['noofBuildingsInGoodCondition'] != null ? this.InstitutionForm.value['noofBuildingsInGoodCondition'] : 0;
        passSaveParams.noofBuildingNeedsMinorRepair = this.InstitutionForm.value['noofBuildingNeedsMinorRepair'] != null ? this.InstitutionForm.value['noofBuildingNeedsMinorRepair'] : 0;
        passSaveParams.noofBuildingNeedsMajorRepair = this.InstitutionForm.value['noofBuildingNeedsMajorRepair'] != null ? this.InstitutionForm.value['noofBuildingNeedsMajorRepair'] :0;
        passSaveParams.otherRooms = this.InstitutionForm.value['otherRooms'] != null ? this.InstitutionForm.value['otherRooms'] : 0;
        passSaveParams.libraryAvailability = this.InstitutionForm.value['selectedLibraryAvailability'] != null ? this.InstitutionForm.value['selectedLibraryAvailability'].labelId : false;
        passSaveParams.separateRoomforHM = this.InstitutionForm.value['selectedSeparateRoomforHM'] != null ? this.InstitutionForm.value['selectedSeparateRoomforHM'].labelId : false;
        passSaveParams.furnitureAvailability = this.InstitutionForm.value['selectedFurnitureAvailability'] != null ? this.InstitutionForm.value['selectedFurnitureAvailability'].labelId : false;
        passSaveParams.electricityAvailability = this.InstitutionForm.value['selectedElectricityAvailability'] != null ? this.InstitutionForm.value['selectedElectricityAvailability'].labelId : false;
        passSaveParams.solarPanel = this.InstitutionForm.value['selectedSolarPanel'] != null ? this.InstitutionForm.value['selectedSolarPanel'].labelId : false;
        passSaveParams.medicalcheckups = this.InstitutionForm.value['selectedMedicalcheckups'] != null ? this.InstitutionForm.value['selectedMedicalcheckups'].labelId : false;

        passSaveParams.ictLab = this.InstitutionForm.value['selectedICTLab'] != null ? this.InstitutionForm.value['selectedICTLab'].labelId : false;
        passSaveParams.internetConnection = this.InstitutionForm.value['selectedInternetConnection'] != null ? this.InstitutionForm.value['selectedInternetConnection'].labelId : false;
        passSaveParams.dthConnection = this.InstitutionForm.value['selectedDTHConnection'] != null ? this.InstitutionForm.value['selectedDTHConnection'].labelId : false;
        passSaveParams.noofDesktop = this.InstitutionForm.value['noofDesktop'] != null ? this.InstitutionForm.value['noofDesktop'] : 0;
        passSaveParams.noofLaptop = this.InstitutionForm.value['noofLaptop'] != null ? this.InstitutionForm.value['noofLaptop'] : 0;
        passSaveParams.noofTablet = this.InstitutionForm.value['noofTablet'] != null ? this.InstitutionForm.value['noofTablet'] : 0;
        passSaveParams.noofPrinter = this.InstitutionForm.value['noofPrinter'] != null ? this.InstitutionForm.value['noofPrinter'] : 0;
        passSaveParams.noofProjector = this.InstitutionForm.value['noofProjector'] != null ? this.InstitutionForm.value['noofProjector'] : 0;
        passSaveParams.noofDigiBoard = this.InstitutionForm.value['noofDigiBoard'] != null ? this.InstitutionForm.value['noofDigiBoard'] : 0;

        passSaveParams.noofTeachers_Primary = this.InstitutionForm.value['noofTeachers_Primary'] != null ? this.InstitutionForm.value['noofTeachers_Primary'] : 0;
        passSaveParams.noofTeachers_PrimaryandUpperPrimary = this.InstitutionForm.value['noofTeachers_PrimaryandUpperPrimary'] != null ? this.InstitutionForm.value['noofTeachers_PrimaryandUpperPrimary'] : 0;
        passSaveParams.noofTeachers_HigerSecondaryOnly = this.InstitutionForm.value['noofTeachers_HigerSecondaryOnly'] != null ? this.InstitutionForm.value['noofTeachers_HigerSecondaryOnly'] : 0;
        passSaveParams.noofTeachers_SecondaryandHigerSecondary = this.InstitutionForm.value['noofTeachers_SecondaryandHigerSecondary'] != null ? this.InstitutionForm.value['noofTeachers_SecondaryandHigerSecondary']: 0;
        passSaveParams.noofTeachers_PrePrimaryandPrimary = this.InstitutionForm.value['noofTeachers_PrePrimaryandPrimary'] != null ? this.InstitutionForm.value['noofTeachers_PrePrimaryandPrimary'] : 0;
        passSaveParams.noofTeachers_UpperPrimary = this.InstitutionForm.value['noofTeachers_UpperPrimary'] != null ? this.InstitutionForm.value['noofTeachers_UpperPrimary'] : 0;
        passSaveParams.noofTeachers_SecondaryOnly = this.InstitutionForm.value['noofTeachers_SecondaryOnly'] != null ? this.InstitutionForm.value['noofTeachers_SecondaryOnly'] : 0;
        passSaveParams.noofTeachers_UpperPrimaryandSecondary = this.InstitutionForm.value['noofTeachers_UpperPrimaryandSecondary'] != null ? this.InstitutionForm.value['noofTeachers_UpperPrimaryandSecondary']: 0;
        passSaveParams.noofTeachers_PrePrimaryOnly = this.InstitutionForm.value['noofTeachers_PrePrimaryOnly'] != null ? this.InstitutionForm.value['noofTeachers_PrePrimaryOnly']: 0;
        passSaveParams.noofTeachers_Regular = this.InstitutionForm.value['noofTeachers_Regular'] != null ? this.InstitutionForm.value['noofTeachers_Regular'] : 0;
        passSaveParams.noofTeachers_Parttime = this.InstitutionForm.value['noofTeachers_Parttime'] != null ? this.InstitutionForm.value['noofTeachers_Parttime'] : 0;
        passSaveParams.noofTeachers_Contract = this.InstitutionForm.value['noofTeachers_Contract'] != null ? this.InstitutionForm.value['noofTeachers_Contract']: 0;
        passSaveParams.noofTeachers_Male = this.InstitutionForm.value['noofTeachers_Male'] != null ? this.InstitutionForm.value['noofTeachers_Male'] : 0;
        passSaveParams.noofTeachers_Female = this.InstitutionForm.value['noofTeachers_Female'] != null ? this.InstitutionForm.value['noofTeachers_Female'] : 0;
        passSaveParams.noofTeachers_Transgender = this.InstitutionForm.value['noofTeachers_Transgender'] != null ? this.InstitutionForm.value['noofTeachers_Transgender'] : 0;
        passSaveParams.totalNoofTeachers = this.InstitutionForm.value['totalNoofTeachers'] != null ? this.InstitutionForm.value['totalNoofTeachers']: 0;
        passSaveParams.noofTotalTeacherReceivedServiceTraining = this.InstitutionForm.value['noofTotalTeacherReceivedServiceTraining'] != null ? this.InstitutionForm.value['noofTotalTeacherReceivedServiceTraining'] : 0;
        passSaveParams.totalTeacherInvolveinNonTeachingAssignment = this.InstitutionForm.value['totalTeacherInvolveinNonTeachingAssignment'] != null ? this.InstitutionForm.value['totalTeacherInvolveinNonTeachingAssignment'] : 0;
        passSaveParams.noofTeachers_BelowGraduate = this.InstitutionForm.value['noofTeachers_BelowGraduate'] != null ? this.InstitutionForm.value['noofTeachers_BelowGraduate'] : 0;
        passSaveParams.noofTeachers_Graduate = this.InstitutionForm.value['noofTeachers_Graduate'] != null ? this.InstitutionForm.value['noofTeachers_Graduate'] : 0;
        passSaveParams.noofTeachers_PostGraduateandAbove = this.InstitutionForm.value['noofTeachers_PostGraduateandAbove'] != null ? this.InstitutionForm.value['noofTeachers_PostGraduateandAbove'] : 0;
        passSaveParams.noofTotalTeachersTrainedinComputer = this.InstitutionForm.value['noofTotalTeachersTrainedinComputer'] != null ? this.InstitutionForm.value['noofTotalTeachersTrainedinComputer'] : 0;
        passSaveParams.noofTeachers_AgedAbove55 = this.InstitutionForm.value['noofTeachers_AgedAbove55'] != null ? this.InstitutionForm.value['noofTeachers_AgedAbove55'] : 0;
        passSaveParams.noofTeachers_DiplomaorCertificateinbasicteacherstraining = this.InstitutionForm.value['noofTeachers_DiplomaorCertificateinbasicteacherstraining'] != null ? this.InstitutionForm.value['noofTeachers_DiplomaorCertificateinbasicteacherstraining']: 0;
        passSaveParams.noofTeachers_BachelorofElementaryEducation = this.InstitutionForm.value['noofTeachers_BachelorofElementaryEducation'] != null ? this.InstitutionForm.value['noofTeachers_BachelorofElementaryEducation'] : 0;
        passSaveParams.noofTeachers_BEdorEquivalent = this.InstitutionForm.value['noofTeachers_BEdorEquivalent'] != null ? this.InstitutionForm.value['noofTeachers_BEdorEquivalent'] : 0;
        passSaveParams.noofTeachers_MEdorEquivalent = this.InstitutionForm.value['noofTeachers_MEdorEquivalent'] != null ? this.InstitutionForm.value['noofTeachers_MEdorEquivalent'] : 0;
        passSaveParams.noofTeachers_DiplomaorDegreeinSpecialEducation = this.InstitutionForm.value['noofTeachers_DiplomaorDegreeinSpecialEducation'] != null ? this.InstitutionForm.value['noofTeachers_DiplomaorDegreeinSpecialEducation'] : 0;
        passSaveParams.noofTeachers_PursuinganyRelevantProfessionalCourse = this.InstitutionForm.value['noofTeachers_PursuinganyRelevantProfessionalCourse'] != null ? this.InstitutionForm.value['noofTeachers_PursuinganyRelevantProfessionalCourse'] : 0;

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

  public GetInstitutionById_V1() {

    try {

      this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.EDIT + '/?institutionId=' + this.InstitutionId)
        .subscribe({
          next: (result: any) => {
            this.InstitutionList = result.institutions;
            // console.log('GetInstitutionById', JSON.stringify(this.InstitutionList));

            if (this.InstitutionList != undefined && this.InstitutionList.length > 0) {

              this.InstitutionId = this.InstitutionList[0].institutionId;

              console.log(JSON.stringify(this.SchoolCategoryList.find(app => app.categoryId === this.InstitutionList[0].schoolCategoryId)));

              this.InstitutionId = this.InstitutionList[0].institutionId;
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
              this.InstitutionForm.controls['selectedMedium']?.setValue(this.MediumofInstructionList.find(app=>app.instructionId === this.InstitutionList[0].instructionId));
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
              this.InstitutionForm.controls['yearofRecognition_Primary']?.setValue(this.InstitutionList[0].yearofRecognition_Primary);
              this.InstitutionForm.controls['yearofRecognition_UpperPrimary']?.setValue(this.InstitutionList[0].yearofRecognition_UpperPrimary);
              this.InstitutionForm.controls['yearofRecognition_Secondary']?.setValue(this.InstitutionList[0].yearofRecognition_Secondary);
              this.InstitutionForm.controls['yearofRecognition_HigherSecondary']?.setValue(this.InstitutionList[0].yearofRecognition_HigherSecondary);
              this.InstitutionForm.controls['affiliationBoard_Secondary']?.setValue(this.InstitutionList[0].affiliationBoard_Secondary);
              this.InstitutionForm.controls['affiliationBoard_HigherSecondary']?.setValue(this.InstitutionList[0].affiliationBoard_HigherSecondary);
              this.InstitutionForm.controls['selectedMinoritySchool']?.setValue(this.InstitutionList[0].selectedMinoritySchool);
              this.InstitutionForm.controls['selectedIsthisaShiftSchool']?.setValue(this.InstitutionList[0].selectedIsthisaShiftSchool);
              this.InstitutionForm.controls['selectedBuildingStatus']?.setValue(this.InstitutionList[0].selectedBuildingStatus);
              this.InstitutionForm.controls['selectedBoundaryWall']?.setValue(this.InstitutionList[0].selectedBoundaryWall);
              this.InstitutionForm.controls['noofBuildingBlocks']?.setValue(this.InstitutionList[0].noofBuildingBlocks);
              this.InstitutionForm.controls['noofPuccaBuildingBlocks']?.setValue(this.InstitutionList[0].noofPuccaBuildingBlocks);
              this.InstitutionForm.controls['selectedIsSpecialSchoolforCWSN']?.setValue(this.InstitutionList[0].selectedIsSpecialSchoolforCWSN);
              this.InstitutionForm.controls['selectedAvailabilityofRamps']?.setValue(this.InstitutionList[0].selectedAvailabilityofRamps);
              this.InstitutionForm.controls['selectedAvailabilityofHandrails']?.setValue(this.InstitutionList[0].selectedAvailabilityofHandrails);


              this.InstitutionForm.controls['totalNoOfToilets_Boys']?.setValue(this.InstitutionList[0].totalNoOfToilets_Boys);
              this.InstitutionForm.controls['totalNoOfToilets_Girls']?.setValue(this.InstitutionList[0].totalNoOfToilets_Girls);
              this.InstitutionForm.controls['functional_Boys']?.setValue(this.InstitutionList[0].functional_Boys);
              this.InstitutionForm.controls['functional_Girls']?.setValue(this.InstitutionList[0].functional_Girls);
              this.InstitutionForm.controls['functionalCWSNFriendly_Boys']?.setValue(this.InstitutionList[0].functionalCWSNFriendly_Boys);
              this.InstitutionForm.controls['functionalCWSNFriendly_Girls']?.setValue(this.InstitutionList[0].functionalCWSNFriendly_Girls);
              this.InstitutionForm.controls['urinal_Boys']?.setValue(this.InstitutionList[0].urinal_Boys);
              this.InstitutionForm.controls['urinal_Girls']?.setValue(this.InstitutionList[0].urinal_Girls);
              this.InstitutionForm.controls['selectedHandwashNearToilet']?.setValue(this.InstitutionList[0].selectedHandwashNearToilet);
              this.InstitutionForm.controls['selectedHandwashFacilityforMeal']?.setValue(this.InstitutionList[0].selectedHandwashFacilityforMeal);
              this.InstitutionForm.controls['selectedDrinkingWaterAvailable']?.setValue(this.InstitutionList[0].selectedDrinkingWaterAvailable);
              this.InstitutionForm.controls['selectedDrinkingWaterFunctional']?.setValue(this.InstitutionList[0].selectedDrinkingWaterFunctional);
              this.InstitutionForm.controls['selectedRainWaterHarvesting']?.setValue(this.InstitutionList[0].selectedRainWaterHarvesting);
              this.InstitutionForm.controls['selectedPlaygroundAvailable']?.setValue(this.InstitutionList[0].selectedPlaygroundAvailable);


              this.InstitutionForm.controls['noofBuildingsInGoodCondition']?.setValue(this.InstitutionList[0].noofBuildingsInGoodCondition);
              this.InstitutionForm.controls['noofBuildingNeedsMinorRepair']?.setValue(this.InstitutionList[0].noofBuildingNeedsMinorRepair);
              this.InstitutionForm.controls['noofBuildingNeedsMajorRepair']?.setValue(this.InstitutionList[0].noofBuildingNeedsMajorRepair);
              this.InstitutionForm.controls['otherRooms']?.setValue(this.InstitutionList[0].otherRooms);
              this.InstitutionForm.controls['selectedLibraryAvailability']?.setValue(this.InstitutionList[0].selectedLibraryAvailability);
              this.InstitutionForm.controls['selectedSeparateRoomforHM']?.setValue(this.InstitutionList[0].selectedSeparateRoomforHM);
              this.InstitutionForm.controls['selectedFurnitureAvailability']?.setValue(this.InstitutionList[0].selectedFurnitureAvailability);
              this.InstitutionForm.controls['selectedElectricityAvailability']?.setValue(this.InstitutionList[0].selectedElectricityAvailability);
              this.InstitutionForm.controls['selectedSolarPanel']?.setValue(this.InstitutionList[0].selectedSolarPanel);
              this.InstitutionForm.controls['selectedMedicalcheckups']?.setValue(this.InstitutionList[0].selectedMedicalcheckups);

              this.InstitutionForm.controls['selectedICTLab']?.setValue(this.InstitutionList[0].selectedICTLab);
              this.InstitutionForm.controls['selectedInternetConnection']?.setValue(this.InstitutionList[0].selectedInternetConnection);
              this.InstitutionForm.controls['selectedDTHConnection']?.setValue(this.InstitutionList[0].selectedDTHConnection);
              this.InstitutionForm.controls['noofDesktop']?.setValue(this.InstitutionList[0].noofDesktop);
              this.InstitutionForm.controls['noofLaptop']?.setValue(this.InstitutionList[0].noofLaptop);
              this.InstitutionForm.controls['noofTablet']?.setValue(this.InstitutionList[0].noofTablet);
              this.InstitutionForm.controls['noofPrinter']?.setValue(this.InstitutionList[0].noofPrinter);
              this.InstitutionForm.controls['noofProjector']?.setValue(this.InstitutionList[0].noofProjector);
              this.InstitutionForm.controls['noofDigiBoard']?.setValue(this.InstitutionList[0].noofDigiBoard);

              this.InstitutionForm.controls['noofTeachers_Primary']?.setValue(this.InstitutionList[0].noofTeachers_Primary);
              this.InstitutionForm.controls['noofTeachers_PrimaryandUpperPrimary']?.setValue(this.InstitutionList[0].noofTeachers_PrimaryandUpperPrimary);
              this.InstitutionForm.controls['noofTeachers_HigerSecondaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_HigerSecondaryOnly);
              this.InstitutionForm.controls['noofTeachers_SecondaryandHigerSecondary']?.setValue(this.InstitutionList[0].noofTeachers_SecondaryandHigerSecondary);
              this.InstitutionForm.controls['noofTeachers_PrePrimaryandPrimary']?.setValue(this.InstitutionList[0].noofTeachers_PrePrimaryandPrimary);
              this.InstitutionForm.controls['noofTeachers_UpperPrimary']?.setValue(this.InstitutionList[0].noofTeachers_UpperPrimary);
              this.InstitutionForm.controls['noofTeachers_SecondaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_SecondaryOnly);
              this.InstitutionForm.controls['noofTeachers_UpperPrimaryandSecondary']?.setValue(this.InstitutionList[0].noofTeachers_UpperPrimaryandSecondary);
              this.InstitutionForm.controls['noofTeachers_PrePrimaryOnly']?.setValue(this.InstitutionList[0].noofTeachers_PrePrimaryOnly);
              this.InstitutionForm.controls['noofTeachers_Regular']?.setValue(this.InstitutionList[0].noofTeachers_Regular);
              this.InstitutionForm.controls['noofTeachers_Parttime']?.setValue(this.InstitutionList[0].noofTeachers_Parttime);
              this.InstitutionForm.controls['noofTeachers_Contract']?.setValue(this.InstitutionList[0].noofTeachers_Contract);
              this.InstitutionForm.controls['noofTeachers_Male']?.setValue(this.InstitutionList[0].noofTeachers_Male);
              this.InstitutionForm.controls['noofTeachers_Female']?.setValue(this.InstitutionList[0].noofTeachers_Female);
              this.InstitutionForm.controls['noofTeachers_Transgender']?.setValue(this.InstitutionList[0].noofTeachers_Transgender);
              this.InstitutionForm.controls['totalNoofTeachers']?.setValue(this.InstitutionList[0].totalNoofTeachers);
              this.InstitutionForm.controls['noofTotalTeacherReceivedServiceTraining']?.setValue(this.InstitutionList[0].noofTotalTeacherReceivedServiceTraining);
              this.InstitutionForm.controls['totalTeacherInvolveinNonTeachingAssignment']?.setValue(this.InstitutionList[0].totalTeacherInvolveinNonTeachingAssignment);
              this.InstitutionForm.controls['noofTeachers_BelowGraduate']?.setValue(this.InstitutionList[0].noofTeachers_BelowGraduate);
              this.InstitutionForm.controls['noofTeachers_Graduate']?.setValue(this.InstitutionList[0].noofTeachers_Graduate);
              this.InstitutionForm.controls['noofTeachers_PostGraduateandAbove']?.setValue(this.InstitutionList[0].noofTeachers_PostGraduateandAbove);
              this.InstitutionForm.controls['noofTotalTeachersTrainedinComputer']?.setValue(this.InstitutionList[0].noofTotalTeachersTrainedinComputer);
              this.InstitutionForm.controls['noofTeachers_AgedAbove55']?.setValue(this.InstitutionList[0].noofTeachers_AgedAbove55);
              this.InstitutionForm.controls['noofTeachers_DiplomaorCertificateinbasicteacherstraining']?.setValue(this.InstitutionList[0].noofTeachers_DiplomaorCertificateinbasicteacherstraining);
              this.InstitutionForm.controls['noofTeachers_BachelorofElementaryEducation']?.setValue(this.InstitutionList[0].noofTeachers_BachelorofElementaryEducation);
              this.InstitutionForm.controls['noofTeachers_BEdorEquivalent']?.setValue(this.InstitutionList[0].noofTeachers_BEdorEquivalent);
              this.InstitutionForm.controls['noofTeachers_MEdorEquivalent']?.setValue(this.InstitutionList[0].noofTeachers_MEdorEquivalent);
              this.InstitutionForm.controls['noofTeachers_DiplomaorDegreeinSpecialEducation']?.setValue(this.InstitutionList[0].noofTeachers_DiplomaorDegreeinSpecialEducation);
              this.InstitutionForm.controls['noofTeachers_PursuinganyRelevantProfessionalCourse']?.setValue(this.InstitutionList[0].noofTeachers_PursuinganyRelevantProfessionalCourse);

              this.IsUpdate = true;
              this.buttonText = "Update";
            }
          },
          error: (err: HttpErrorResponse) => console.log('fnGetById', err)

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

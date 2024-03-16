import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { IBloodGroup, IGender, IStudent } from 'src/app/+school/services/interfaces/IStudent';

import { ICountry } from 'src/app/shared/interface/ICountry';
import { IState } from 'src/app/shared/interface/IState';
import { UtilService } from 'src/app/shared/util.service';

import * as yup from 'yup';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { YupSchoolValidation } from 'src/app/+school/services/validation-schemas/yup-validation-schema';
import { Router } from '@angular/router';
import { SchoolValidation } from 'src/app/+school/services/school-validation';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { IFeesCategory, IFeesStatus, ILabel, IModeofTransport, IPaymentMethod } from 'src/app/+school/services/interfaces/ICommon';
import { AppConstant } from 'src/app/config/app.constant';
import { IMiscDetails } from 'src/app/shared/interface/IMisc';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { PMSAPIConfig } from 'src/app/+pms/services/pms-api-config';

import * as _ from 'lodash';
import { CommonService } from 'src/app/shared-services/common.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent {


  public buttonText: string = "Save"

  PresentStateList: IState[] = [];
  PresentCoutryList: ICountry[] = [];

  PermanentStateList: IState[] = [];
  PermanentCoutryList: ICountry[] = [];

  activeTab = 'student-information';

  private IsUpdate: boolean = false;

  ImageFiles: string[] = [];
  public ImagePath: string | undefined = "";
  selectedStudentImageURL: any = "assets/demo/images/avatar/circle/avatar-f-1@2x.png";

  cols: any[] = [];
  // filterSchoolDetailList: IStudent[] = []
  filterSchoolDetailList: IMiscDetails[] = [];
  filterSibilingsDetailList: IMiscDetails[] = [];
  items: any[] = [];

  FeesAmount: ILabel[] = [];
  FeesCategory: IFeesCategory[] = [];
  FeesStatus: IFeesStatus[] = [];
  PaymentMethod: IPaymentMethod[] = [];
  ModeofTransport: IModeofTransport[] = [];
  RTE: ILabel[] = [];

  bloodGroupList: IBloodGroup[] = [];
  genderList: IGender[] = [];

  StudentForm: FormGroup<YupFormControls<IStudent>>

  initialValues: IStudent = {

    studentId: null,
    rollNo: null,
    admissionNo: null,
    ewsNo: null,

    // Personal Info
    firstName: null,
    lastName: null,
    gender: null,
    DOB: null,
    age: null,
    genderId: null,
    selectedGender: null,
    bloodGroupId: null,
    selectedBloodGroup: null,

    // Present Address
    presentAddress1: null,
    presentAddress2: null,
    presentAddress3: null,
    presentCity: null,
    presentstateId:null,
    selectedPresentState: null,
    presentCountryId: null,
    selectedPresentCountry: null,
    presentPIN: null,

    // Permanent Address
    permanentAddress1: null,
    permanentAddress2: null,
    permanentAddress3: null,
    permanentCity: null,
    permanentStateId:null,
    selectedpermanentState: null,
    permanentCountryId:null,
    selectedpermanentCountry: null,
    permanentPIN: null,

    //  Emergency Contact Info
    contactPerson1: null,
    mobileNo1: null,
    contactPerson2: null,
    mobileNo2: null,
    bloodGroup: null,

    // Unique Number Info
    nationality: null,
    panNo: null,
    community: null,
    aadhaarNo: null,
    uanNo: null,
    esiNo: null,
    epfNo: null,

    fatherName: null,
    fatherEducationQualification: null,
    fatherOccupation: null,
    fatherDesignation: null,
    fatherOrganizationInstitution: null,
    fatherOfficeAddress: null,
    fatherResidentialAddress: null,
    fatherAnnualIncome: null,
    fatherMobileNumber: null,
    fatherEmail: null,
    fatherAadharNumber: null,

    motherName: null,
    motherEducationQualification: null,
    motherOccupation: null,
    motherDesignation: null,
    motherOrganizationInstitution: null,
    motherOfficeAddress: null,
    motherResidentialAddress: null,
    motherAnnualIncome: null,
    motherMobileNumber: null,
    motherEmail: null,
    motherAadharNumber: null,

    guardianName: null,
    guardianEducationQualification: null,
    guardianOccupation: null,
    guardianDesignation: null,
    guardianOrganizationInstitution: null,
    guardianOfficeAddress: null,
    guardianResidentialAddress: null,
    guardianAnnualIncome: null,
    guardianMobileNumber: null,
    guardianEmail: null,
    guardianAadharNumber: null,

    totalPresent: null,
		totalLate: null,
		totalAbsent: null,
		totalHalfDay: null,
		totalHoliday: null,

    feesCategoryId: null,
    selectedFeesCategory: null,
    paymentMethodId: null,
    selectedPaymentMethod: null,
    feesStatusId: null,
    selectedFeesStatus: null,

    selectedModeofTransport:null,
    selectedRTE:null,

    isActive: null,
    userId: null,
    ipAddress: null,

  };

  validationSchemaL: yup.ObjectSchema<IStudent> = YupSchoolValidation.STUDENT

  formError = (controlName: string, formName: any) => {
    return this.utilService.formError(controlName, formName);
  };

  constructor(
    private utilService: UtilService,
    private router: Router,
    private messageService: MessageService,
    private productService: ProductService,
    private httpService: CommonHttpService,
    private commonService: CommonService,
  ) {
    this.StudentForm = FormHandler.controls<IStudent>(this.initialValues);
    this.StudentForm.setValidators(FormHandler.validate<IStudent>(this.validationSchemaL))
  }

  ngOnInit() {
    this.GetAll();
    this.fetchStudentData();
    this.GetCountries();
    this.GetState();
  }

  public GetAll() {
    this.FeesAmount = AppConstant.DDL_YES_NO;
    this.FeesStatus = AppConstant.FeesStatus
    this.PaymentMethod = AppConstant.PaymentMethod
    this.FeesCategory = AppConstant.FeesCategory
    this.ModeofTransport = AppConstant.ModeofTransport
    this.RTE = AppConstant.DDL_YES_NO
  }
  
  fetchStudentData() {

    try {
      this.httpService.globalGet(PMSAPIConfig.API_CONFIG.API_URL.MASTER.EMPLOYEE.DATA)
      .subscribe({
        next:(result:any) =>{

          // gendersStart
          const genders = _.filter(
            result.loadEmployeesData.miscDtl,
            (val) => {
              return val.miscId == 14
            }
          );

          this.genderList = genders.map((x)=> {
            return<IGender>{
              genderId: x.miscDtlId,
              genderName: x.miscDtlName
            }
          })
          // gendersEnd

          // bloodGroupsStart
          const bloodGroups = _.filter(
            result.loadEmployeesData.miscDtl,
            (val) => {
              return val.miscId == 1
            }
          );

          this.bloodGroupList = bloodGroups.map((x) => {
            return <IBloodGroup>{
              bloodGroupId: x.miscDtlId,
              bloodGroupName: x.miscDtlName
            };
          })
          // bloodGroupsEnd

        }
      })
    } catch (error) {
      
    }

  }

  Save() {

  }

  RedirecttoList() {
    this.router.navigate(['/apps/students/student-list']);
  }

  Clear() {
    this.buttonText = "Save";
    this.IsUpdate = false;
    this.StudentForm.reset();
  }

  Edit(){

  }

  Delete(){

  }

  getSelectedFile($event: any) {

    if ($event.length === 0) {
      return;
    }

    for (var i = 0; i < $event.target.files.length; i++) {

      // #region Validation
      var mimeType = $event.target.files[i].type;
      if (mimeType.match(/image\/*/) == null) {
        this.notificationsService(SchoolValidation.NOTIFICATION_VALIDATION, 'Validation', "Only images are supported.")
        return;
      }
      // #endregion

      this.ImageFiles.push($event.target.files[i]);
    }
    this.ImagePath = $event.target.files;

    //#region PREVIEW IMAGE
    var reader = new FileReader();
    this.ImagePath = $event.target.files;
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (_event) => {
      this.selectedStudentImageURL = reader.result;
    }
    //#endregion
  }

  public GetCountries() {
    try {
        this.commonService.getCountries().then((val) => {
            this.PresentCoutryList = val;
            this.PermanentCoutryList = val;
        });
    } catch (error) {}
}

  public GetState() {
      this.commonService.getStates().then((val) => {
         this.PresentStateList = val;
         this.PermanentStateList = val;
      })
    try {
      
    } catch (error) {
      
    }

  }

  onChangeforState(data:any){

    if(this.StudentForm.value['selectedPresentState'] !=null && this.StudentForm.value['selectedPresentState']!=undefined){
      let _countryId:number = this.StudentForm.value['selectedPresentState'].countryId;
      this.StudentForm.get("selectedPresentCountry")?.setValue(this.PresentCoutryList.find(c => c.countryId === _countryId))
    }
    else if (this.StudentForm.value['selectedPresentState'] === null || this.StudentForm.value['selectedPresentState'] === undefined) {
      this.StudentForm.get("selectedPresentCountry")?.setValue(null);
  } 
  }

  onChangeforPermanantState(data: any) {
    if (this.StudentForm.value['selectedpermanentState'] !== null && this.StudentForm.value['selectedpermanentState'] !== undefined) {
        let _countryId: number = this.StudentForm.value['selectedpermanentState'].countryId;
        this.StudentForm.get("selectedpermanentCountry")?.setValue(this.PermanentCoutryList.find(c => c.countryId === _countryId));
    } 
    else if (this.StudentForm.value['selectedpermanentState'] === null || this.StudentForm.value['selectedpermanentState'] === undefined) {
        this.StudentForm.get("selectedpermanentCountry")?.setValue(null);
    } 
}

  filterMagePage(event: AutoCompleteCompleteEvent) {

  }

  SibilingsDetailAddRows(){
    try {
      let databind:any = {}

      databind.miscDtlName = ""
      databind.miscDtUpload = ""
      databind.miscDtlDesc = ""

      this.filterSibilingsDetailList.push(databind)
    } catch (error) {
      
    }
  }

  SibilingsDetailRemoveRows(data: any, index: number){

    try {
      this.filterSibilingsDetailList.splice(index,1)
    } catch (error) {
      
    }
  }

  SchoolDetailAddRows(){
    try {
      let databind:any = {}

      databind.miscDtlName = ""
      databind.miscDtUpload = ""
      databind.miscDtlDesc = ""

      this.filterSchoolDetailList.push(databind)
    } catch (error) {
      
    }
  }

  SchoolDetailRemoveRows(data: any, index: number){

    try {
      this.filterSchoolDetailList.splice(index,1)
    } catch (error) {
      
    }
  }

  onGlobalFilter(table: Table, event: Event) { 
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains'); 
  }

  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }
}

import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


import { Table } from 'primeng/table';

import {  IEducationDetail, IEmployee, ISpecialization, ISalutation, IGender, IBloodGroup, IEmployeeCategory, IDepartment,
     IEmploymentTypes, ISalaryType, IShifts, IDesignations, ICommunity,  IQualification, ICourse, ICourseType, IWorkExperienceDetail, IJobTitle } from 'src/app/+pms/services/interfaces/IEmployee';

import * as yup from 'yup';
import { YupPMSValidation } from 'src/app/+pms/services/validation-schemas/yup-pms-validation';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';

import { UtilService } from 'src/app/shared/util.service';
import { IState } from 'src/app/shared/interface/IState';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

import * as _ from 'lodash';

import { ConfirmationService, MessageService } from 'primeng/api';
import { PMSValidation } from 'src/app/+pms/services/pms-validation';
import { CommonService } from 'src/app/shared-services/common.service';
import { PMSAPIConfig } from 'src/app/+pms/services/pms-api-config';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { INationality } from 'src/app/shared/interface/INationalityl';





interface Image {
    name: string;
    objectURL: string;
}

//   Drop down by mj tamil

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html',
    styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent {
    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

    text: string = '';
    uploadedFiles: any[] = [];
    showRemove: boolean = false;

    // Save
    public buttonText: string = 'Save';

    //   Grid List by mj tamil

    cols: any[] = [];
    selectedItems: any[] = [];
    items: any[] = [];
    filteredMiscDetailList: IEmployee[] = [];

    // For Add Rows
    EducationDetailList: IEducationDetail[] = [];
    EducationDetailItem: IEducationDetail = {};
    ExperienceDetailList: IWorkExperienceDetail[] = [];

    private isValidation: boolean = true;
    private ValidationMsg: string = '';

    deleteDialog: boolean = false;

    // AutoComplete
    StateList: IState[] = [];
    permanantStateList: IState[] = [];
    CoutryList: ICountry[] = [];
    permanantCoutryList: ICountry[] = [];
    NationalityList: INationality[] = [];

    // For Pan to UpperCase by mj
    // alphanumUpperCaseFilter: RegExp = /^[a-zA-Z0-9]*$/;

    //#region UI VALIDATION VARIABLES
    //  Step 1
    EmployeeForm: FormGroup<YupFormControls<IEmployee>>;

    // Step 2 INITIALIZER
    initialValues: IEmployee = {
        employeeId: null,
        // Personal Info
        employeeNo: null,
        salutationId: null,
        selectedSalutation: null,
        firstName: null,
        lastName: null,
        nickName: null,
        genderId: null,
        selectedGender: null,
        dob: null,
        age: null,

        // Present Address
        address1: null,
        address2: null,
        address3: null,
        city: null,
        stateId: null,
        selectedState: null,
        countryId: null,
        selectedCountry: null,
        pinCode: null,

        // Permanent Address
        sameasPresent: null,
        permanantAddress1: null,
        permanantAddress2: null,
        permanantAddress3: null,
        permanantCity: null,
        permanantStateId: null,
        permanantSelectedState: null,
        permanantCountryId: null,
        permanantSelectedCountry: null,
        permanantPINCode: null,

        contactPerson1: null,
        contactPersonMobileNo1: null,
        contactPerson2: null,
        contactPersonMobileNo2: null,
        bloodGroupId: null,
        selectedBloodGroup: null,

        // Unique Number Info
        panNo: null,
        uanNo: null,
        passportNo: null, //
        passportExpDt: null, //
        drivingLicenseNo: null, //
        drivingLicenseExpDt: null, //
        aadhaarNo: null,
        esiNo: null,
        epfNo: null,
        nationalityId: null,
        selectedNationality: null,
        communityId: null,
        selectedCommunity: null,
        jobDescription: null,
        aboutMe: null,
        identyMarks1: null,
        identyMarks2: null,

        //  Organizational Info
        officialEmail: null,
        officialMobile: null,
        dateofJoin: null,
        empCategoryId: null,
        selectedEmployeeCategory: null,
        departmentId: null,
        selectedDepartment: null,
        sectionId: null,
        selectedSection: null,

        employeementTypeId: null,
        selectedEmployeementType: null,
        reportingToId: null,
        selectedReportingTo: null,
        salaryTypeId: null,
        selectedSalaryType: null,
        locationId: null,
        selectedLocation: null,
        shiftId: null,
        selectedShift: null,
        designationId: null,
        selectedDesignation: null,

        // eduaction
        educationDtlId: null,
        qualificationId: null,
        // qualificationName:null,
        selectedQualification: null,
        courseId: null,
        selectedCourse: null,
        specialisationId: null,
        selectedSpecialisation: null,
        schoolCollege: null,
        yearOfPassing: null,
        percentage: null,
        modeOfStudyId: null,
        selectedModeOfStudy: null,

        // work experience
        workExperienceDtlId: null,
        companyName: null,
        fromDate: null,
        toDate: null,
        experience: null,
        jobTitleId: null,
        selectedJobTitle: null,
        jobDesc: null,
        reasonForChange: null,

        isActive: null,
        companyId: null,
        unitId: null,
        userId: null,
        ipAddress: null,
    };

    // Step 3 VALIDATION
    validationSchema: yup.ObjectSchema<IEmployee> = YupPMSValidation.EMPLOYEE;

    // Step 4 FORM ERROR
    formError = (controlName: string, formName: any) => {
        return this.utilService.formError(controlName, formName);
    };
    //#endregion

    // Profile DDL
    salutationList: ISalutation[] = [];
    genderList: IGender[] = [];
    employeeCategoryList: IEmployeeCategory[] = [];
    departmentList: IDepartment[] = [];
    employmentTypesList: IEmploymentTypes[] = [];
    salaryTypeList: ISalaryType[] = [];
    shiftsTypeList: IShifts[] = [];
    designationTypeList: IDesignations[] = [];
    communityList: ICommunity[] = [];
    bloodGroupList: IBloodGroup[] = [];

    // Education DDL
    QualificationList: IQualification[] = [];
    CourseList: ICourse[] = [];
    SpecialisationList: ISpecialization[] = [];
    CourseTypeList: ICourseType[] = [];

    // Work
    previousJObList: IJobTitle[] = [];
    DeletedEducationDtls: IEducationDetail[] = [];

    //#region EDUCATION DETAIL
    eduAddSubmitted: boolean = false;
    educationDialog: boolean = false;

    //#endregion

    //#region WORK EXPERIENCE DETAIL
    wrkAddSubmitted: boolean = false;
    workExperienceDialog: boolean = false;

    //#endregion

    ImageFiles: string[] = [];
    public ImagePath: string | undefined = '';
    selectedEmployeeImageURL: any = 'assets/demo/images/avatar/emp.jpg';

    constructor(
        private utilService: UtilService,
        private router: Router,
        private httpService: CommonHttpService,
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService,
        private confirmationService: ConfirmationService
    ) {
        this.EmployeeForm = FormHandler.controls<IEmployee>(this.initialValues);
        this.EmployeeForm.setValidators(
            FormHandler.validate<IEmployee>(this.validationSchema)
        );
    }

    
    ngOnInit() {
        this.GetCountries();
        this.GetStates();
        this.fetchEmployeesData();
    }

    fetchEmployeesData() {
        try {
            this.httpService
                .globalGet(PMSAPIConfig.API_CONFIG.API_URL.MASTER.EMPLOYEE.DATA)
                .subscribe({
                    next: (result: any) => {
                        // console.log( 'fetchEmployeesData()',   result.loadEmployeesData );
                        this.EmployeeForm.controls['employeeNo']?.setValue(result.loadEmployeesData.autoGenerateNo[0] .autoGenerateNo );
                        this.EmployeeForm.controls['employeeNo']?.disable();

                        // console.log(JSON.stringify(result.loadEmployeesData.miscDtl));

                        // bloodGroups
                        const bloodGroups = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 1;
                            }
                        );
                        this.bloodGroupList = bloodGroups.map((x) => {
                            return <IBloodGroup>{
                                bloodGroupId: x.miscDtlId,
                                bloodGroupName: x.miscDtlName,
                            };
                        });

                        // EmployeeCategories
                        const employeeCategories = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 2;
                            }
                        );

                        this.employeeCategoryList = employeeCategories.map(
                            (x) => {
                                return <IEmployeeCategory>{
                                    empCategoryId: x.miscDtlId,
                                    employeeCategoryName: x.miscDtlName,
                                };
                            }
                        );

                        // Departments
                        const departments = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 3;
                            }
                        );

                        this.departmentList = departments.map((x) => {
                            return <IDepartment>{
                                departmentId: x.miscDtlId,
                                departmentName: x.miscDtlName,
                            };
                        });

                        // EmploymentTypes
                        const employmentTypes = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 4;
                            }
                        );

                        this.employmentTypesList = employmentTypes.map((x) => {
                            return <IEmploymentTypes>{
                                employeementTypeId: x.miscDtlId,
                                employmentTypesName: x.miscDtlName,
                            };
                        });

                        // SalaryType
                        const salaryType = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 5;
                            }
                        );

                        this.salaryTypeList = salaryType.map((x) => {
                            return <ISalaryType>{
                                salaryTypeId: x.miscDtlId,
                                SalaryTypeName: x.miscDtlName,
                            };
                        });

                        // Shifts
                        const shift = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 6;
                            }
                        );

                        this.shiftsTypeList = shift.map((x) => {
                            return <IShifts>{
                                shiftId: x.miscDtlId,
                                shiftTypeName: x.miscDtlName,
                            };
                        });

                        // Designations
                        const designation = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 7;
                            }
                        );

                        this.designationTypeList = designation.map((x) => {
                            return <IDesignations>{
                                designationId: x.miscDtlId,
                                designationName: x.miscDtlName,
                            };
                        });

                        this.previousJObList = designation.map((x) => {
                            return <IJobTitle>{
                                jobTitleId: x.miscDtlId,
                                jobTitleName: x.miscDtlName,
                            };
                        });

                        // communityList
                        const community = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 8;
                            }
                        );

                        this.communityList = community.map((x) => {
                            return <ICommunity>{
                                communityId: x.miscDtlId,
                                communityName: x.miscDtlName,
                            };
                        });

                        // eduQualification

                        const eduQualification = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 9;
                            }
                        );

                        this.QualificationList = eduQualification.map((x) => {
                            return <IQualification>{
                                qualificationId: x.miscDtlId,
                                qualificationName: x.miscDtlName,
                            };
                        });

                        // eduCourseList
                        const eduCourse = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 10;
                            }
                        );

                        this.CourseList = eduCourse.map((x) => {
                            return <ICourse>{
                                courseId: x.miscDtlId,
                                courseName: x.miscDtlName,
                            };
                        });

                        // eduSpecialization
                        const eduSpecialization = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 11;
                            }
                        );

                        this.SpecialisationList = eduSpecialization.map((x) => {
                            return <ISpecialization>{
                                specialisationId: x.miscDtlId,
                                specialisationName: x.miscDtlName,
                            };
                        });

                        // CourseTypeList

                        const courseType = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 12;
                            }
                        );

                        this.CourseTypeList = courseType.map((x) => {
                            return <ICourseType>{
                                modeOfStudyId: x.miscDtlId,
                                courseTypeName: x.miscDtlName,
                            };
                        });

                        // salutation
                        const salutations = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 13;
                            }
                        );

                        this.salutationList = salutations.map((x) => {
                            return <ISalutation>{
                                salutationId: x.miscDtlId,
                                salutationName: x.miscDtlName,
                            };
                        });

                        // genders
                        const genders = _.filter(
                            result.loadEmployeesData.miscDtl,
                            (val) => {
                                return val.miscId == 14;
                            }
                        );

                        this.genderList = genders.map((x) => {
                            return <IGender>{
                                genderId: x.miscDtlId,
                                genderName: x.miscDtlName,
                            };
                        });
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        } catch (error) {}
    }

    // calculateAge
    calculateAge() {
        // console.log('calculateAge', this.EmployeeForm);

        if (
            this.EmployeeForm.value['dob'] != undefined &&
            this.EmployeeForm.value['dob'] != null
        ) {
            const today = new Date();
            const birthDate = new Date(this.EmployeeForm.value['dob']);

            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            console.log('age', age);
            this.EmployeeForm.controls['age']?.setValue(age);
        } else {
            // Handle the case when no date is selected
            this.EmployeeForm.controls['age']?.setValue(0);
        }
    }


// For Pan to UpperCase by mj
    onInputChangeForPan() {
      
        if (this.EmployeeForm.value['panNo']) {
          this.EmployeeForm.controls['panNo']?.setValue(this.EmployeeForm.value['panNo'].toUpperCase())
        }
      }
      
  
    //   Grid List by mj tamil

    // for Filter
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    // Filter

    // #region Countries
    public GetCountries() {
        try {
            this.commonService.getCountries().then((res) => {
                this.CoutryList = res;
                this.permanantCoutryList = res;
                this.NationalityList = res;
            });
        } catch (error) {}
    }
    //  #endregion

    // #region States
    public GetStates() {
        try {
            this.commonService.getStates().then((res) => {
                this.StateList = res;
                this.permanantStateList = res;
            });
        } catch (error) {}
    }

    onChangeforState(data:any){
        if(this.EmployeeForm.value['selectedState'] !=null && this.EmployeeForm.value['selectedState'] !=undefined){
            let _countryId:number=this.EmployeeForm.value['selectedState'].countryId;
            this.EmployeeForm.get("selectedCountry")?.setValue(this.CoutryList.find(c => c.countryId === _countryId))
         
        }
        else if (this.EmployeeForm.value['selectedState'] === null || this.EmployeeForm.value['selectedState'] === undefined) {
            this.EmployeeForm.get("selectedCountry")?.setValue(null);
        } 
       
        
    }

    onClearState(data:any){
        this.EmployeeForm.get('selectedCountry')?.reset();
    }

    onChangeforPermanantState(data: any) {
        if (this.EmployeeForm.value['permanantSelectedState'] !== null && this.EmployeeForm.value['permanantSelectedState'] !== undefined) {
            let _countryId: number = this.EmployeeForm.value['permanantSelectedState'].countryId;
            this.EmployeeForm.get("permanantSelectedCountry")?.setValue(this.permanantCoutryList.find(c => c.countryId === _countryId));
        } 
        else if (this.EmployeeForm.value['permanantSelectedState'] === null || this.EmployeeForm.value['permanantSelectedState'] === undefined) {
            this.EmployeeForm.get("permanantSelectedCountry")?.setValue(null);
        } 
    }


    handleSameAsPresentAddress() {
        const { address1, address2, address3, city, selectedState, selectedCountry, pinCode  } = this.EmployeeForm.value;
          
          if (address1 != null  && address2 != null) {
            this.EmployeeForm.get('permanantAddress1')?.setValue(address1);
            this.EmployeeForm.get('permanantAddress2')?.setValue(address2);
            this.EmployeeForm.get('permanantAddress3')?.setValue(address3);
            this.EmployeeForm.get('permanantCity')?.setValue(city);
            this.EmployeeForm.get('permanantSelectedState')?.setValue(selectedState);
            this.EmployeeForm.get('permanantSelectedCountry')?.setValue(selectedCountry);
            this.EmployeeForm.get('permanantPINCode')?.setValue(pinCode);
          } else {
            this.EmployeeForm.get('permanantAddress1')?.setValue("");
          }
    }

    

    //  #endregion



    AddEductionDetail() {}

    Save() {
        // console.log("check",this.EmployeeForm.value['selectedSalutation'].salutationId);

        try {
            let _apiUrl: string = '';
            let passSaveParams: any = {};
            // console.log(passSaveParams.educationDetail);

            // is this correct instead of old code?
            // passSaveParams.employeeId = this.EmployeeForm.value['employeeId'] || "";
            passSaveParams.employeeId =
                this.EmployeeForm.value['employeeId'] != null
                    ? this.EmployeeForm.value['employeeId']
                    : '';
            passSaveParams.employeeNo =
                this.EmployeeForm.value['employeeNo'] != null
                    ? this.EmployeeForm.value['employeeNo']
                    : '';

            passSaveParams.salutationId =
                this.EmployeeForm.value['selectedSalutation'] != undefined &&
                this.EmployeeForm.value['selectedSalutation'] != null
                    ? this.EmployeeForm.value['selectedSalutation'].salutationId
                    : 0;

            passSaveParams.firstName =
                this.EmployeeForm.value['firstName'] != null
                    ? this.EmployeeForm.value['firstName']
                    : '';
            passSaveParams.lastName =
                this.EmployeeForm.value['lastName'] != null
                    ? this.EmployeeForm.value['lastName']
                    : '';
            passSaveParams.nickName =
                this.EmployeeForm.value['nickName'] != null
                    ? this.EmployeeForm.value['nickName']
                    : '';
            passSaveParams.genderId =
                this.EmployeeForm.value['selectedGender'] != undefined &&
                this.EmployeeForm.value['selectedGender'] != null
                    ? this.EmployeeForm.value['selectedGender'].genderId
                    : 0;
            passSaveParams.dob =
                this.EmployeeForm.value['dob'] != null
                    ? this.EmployeeForm.value['dob']
                    : null;
            passSaveParams.age =
                this.EmployeeForm.value['age'] != null
                    ? this.EmployeeForm.value['age']
                    : 0;
            passSaveParams.address1 =
                this.EmployeeForm.value['address1'] != null
                    ? this.EmployeeForm.value['address1']
                    : '';
            passSaveParams.address2 =
                this.EmployeeForm.value['address2'] != null
                    ? this.EmployeeForm.value['address2']
                    : '';
            passSaveParams.address3 =
                this.EmployeeForm.value['address3'] != null
                    ? this.EmployeeForm.value['address3']
                    : '';
            passSaveParams.city =
                this.EmployeeForm.value['city'] != null
                    ? this.EmployeeForm.value['city']
                    : '';
            passSaveParams.stateId =
                this.EmployeeForm.value['selectedState'] != undefined &&
                this.EmployeeForm.value['selectedState'] != null
                    ? this.EmployeeForm.value['selectedState'].stateId
                    : 0;
            passSaveParams.countryId =
                this.EmployeeForm.value['selectedCountry'] != undefined &&
                this.EmployeeForm.value['selectedCountry'] != null
                    ? this.EmployeeForm.value['selectedCountry'].countryId
                    : 0;
            passSaveParams.pinCode =
                this.EmployeeForm.value['pinCode'] != null
                    ? this.EmployeeForm.value['pinCode']
                    : 0;
            passSaveParams.sameasPresent =
                this.EmployeeForm.value['sameasPresent'] != null
                    ? this.EmployeeForm.value['sameasPresent']
                    : false;
            passSaveParams.permanantAddress1 =
                this.EmployeeForm.value['permanantAddress1'] != null
                    ? this.EmployeeForm.value['permanantAddress1']
                    : '';
            passSaveParams.permanantAddress2 =
                this.EmployeeForm.value['permanantAddress2'] != null
                    ? this.EmployeeForm.value['permanantAddress2']
                    : '';
            passSaveParams.permanantAddress3 =
                this.EmployeeForm.value['permanantAddress3'] != null
                    ? this.EmployeeForm.value['permanantAddress3']
                    : '';
            passSaveParams.permanantCity =
                this.EmployeeForm.value['permanantCity'] != null
                    ? this.EmployeeForm.value['permanantCity']
                    : '';
            passSaveParams.permanantStateId =
                this.EmployeeForm.value['permanantSelectedState'] !=
                    undefined &&
                this.EmployeeForm.value['permanantSelectedState'] != null
                    ? this.EmployeeForm.value['permanantSelectedState'].stateId
                    : 0;
            passSaveParams.permanantCountryId =
                this.EmployeeForm.value['permanantSelectedCountry'] !=
                    undefined &&
                this.EmployeeForm.value['permanantSelectedCountry'] != null
                    ? this.EmployeeForm.value['permanantSelectedCountry']
                          .countryId
                    : 0;
            passSaveParams.permanantPINCode =
                this.EmployeeForm.value['permanantPINCode'] != null
                    ? this.EmployeeForm.value['permanantPINCode']
                    : 0;
            passSaveParams.contactPerson1 =
                this.EmployeeForm.value['contactPerson1'] != null
                    ? this.EmployeeForm.value['contactPerson1']
                    : '';
            passSaveParams.contactPersonMobileNo1 =
                this.EmployeeForm.value['contactPersonMobileNo1'] != null
                    ? this.EmployeeForm.value['contactPersonMobileNo1']
                    : '';
            passSaveParams.contactPerson2 =
                this.EmployeeForm.value['contactPerson2'] != null
                    ? this.EmployeeForm.value['contactPerson2']
                    : '';
            passSaveParams.contactPersonMobileNo2 =
                this.EmployeeForm.value['contactPersonMobileNo2'] != null
                    ? this.EmployeeForm.value['contactPersonMobileNo2']
                    : '';
            passSaveParams.bloodGroupId =
                this.EmployeeForm.value['selectedBloodGroup'] != undefined &&
                this.EmployeeForm.value['selectedBloodGroup'] != null
                    ? this.EmployeeForm.value['selectedBloodGroup'].bloodGroupId
                    : 0;
            passSaveParams.panNo =
                this.EmployeeForm.value['panNo'] != null
                    ? this.EmployeeForm.value['panNo']
                    : '';
            passSaveParams.uanNo =
                this.EmployeeForm.value['uanNo'] != null
                    ? this.EmployeeForm.value['uanNo']
                    : '';
            passSaveParams.passportNo =
                this.EmployeeForm.value['passportNo'] != null
                    ? this.EmployeeForm.value['passportNo']
                    : '';
            passSaveParams.passportExpDt =
                this.EmployeeForm.value['passportExpDt'] != null
                    ? this.EmployeeForm.value['passportExpDt']
                    : null;
            passSaveParams.drivingLicenseNo =
                this.EmployeeForm.value['drivingLicenseNo'] != null
                    ? this.EmployeeForm.value['drivingLicenseNo']
                    : '';
            passSaveParams.drivingLicenseExpDt =
                this.EmployeeForm.value['drivingLicenseExpDt'] != null
                    ? this.EmployeeForm.value['drivingLicenseExpDt']
                    : null;
            passSaveParams.aadhaarNo =
                this.EmployeeForm.value['aadhaarNo'] != null
                    ? this.EmployeeForm.value['aadhaarNo']
                    : '';
            passSaveParams.esiNo =
                this.EmployeeForm.value['esiNo'] != null
                    ? this.EmployeeForm.value['esiNo']
                    : '';
            passSaveParams.epfNo =
                this.EmployeeForm.value['epfNo'] != null
                    ? this.EmployeeForm.value['epfNo']
                    : '';
            // passSaveParams.nationalityId=this.EmployeeForm.value['nationalityId']!=null?this.EmployeeForm.value['nationalityId']:0;
            passSaveParams.nationalityId =
                this.EmployeeForm.value['selectedNationality'] != undefined &&
                this.EmployeeForm.value['selectedNationality'] != null
                    ? this.EmployeeForm.value['selectedNationality'].countryId
                    : 0;
            passSaveParams.communityId =
                this.EmployeeForm.value['selectedCommunity'] != undefined &&
                this.EmployeeForm.value['selectedCommunity'] != null
                    ? this.EmployeeForm.value['selectedCommunity'].communityId
                    : 0;
            passSaveParams.jobDescription =
                this.EmployeeForm.value['jobDescription'] != null
                    ? this.EmployeeForm.value['jobDescription']
                    : '';
            passSaveParams.aboutMe =
                this.EmployeeForm.value['aboutMe'] != null
                    ? this.EmployeeForm.value['aboutMe']
                    : '';
            passSaveParams.identyMarks1 =
                this.EmployeeForm.value['identyMarks1'] != null
                    ? this.EmployeeForm.value['identyMarks1']
                    : '';
            passSaveParams.identyMarks2 =
                this.EmployeeForm.value['identyMarks2'] != null
                    ? this.EmployeeForm.value['identyMarks2']
                    : '';
            passSaveParams.officialEmail =
                this.EmployeeForm.value['officialEmail'] != null
                    ? this.EmployeeForm.value['officialEmail']
                    : '';
            passSaveParams.officialMobile =
                this.EmployeeForm.value['officialMobile'] != null
                    ? this.EmployeeForm.value['officialMobile']
                    : '';
            passSaveParams.dateofJoin =
                this.EmployeeForm.value['dateofJoin'] != null
                    ? this.EmployeeForm.value['dateofJoin']
                    : null;
            passSaveParams.empCategoryId =
                this.EmployeeForm.value['selectedEmployeeCategory'] !=
                    undefined &&
                this.EmployeeForm.value['selectedEmployeeCategory'] != null
                    ? this.EmployeeForm.value['selectedEmployeeCategory']
                          .empCategoryId
                    : 0;
            passSaveParams.departmentId =
                this.EmployeeForm.value['selectedDepartment'] != undefined &&
                this.EmployeeForm.value['selectedDepartment'] != null
                    ? this.EmployeeForm.value['selectedDepartment'].departmentId
                    : 0;
            passSaveParams.sectionId =
                this.EmployeeForm.value['sectionId'] != null
                    ? this.EmployeeForm.value['sectionId']
                    : 0;
            passSaveParams.employeementTypeId =
                this.EmployeeForm.value['selectedEmployeementType'] !=
                    undefined &&
                this.EmployeeForm.value['selectedEmployeementType'] != null
                    ? this.EmployeeForm.value['selectedEmployeementType']
                          .employeementTypeId
                    : 0;
            passSaveParams.reportingToId =
                this.EmployeeForm.value['reportingToId'] != null
                    ? this.EmployeeForm.value['reportingToId']
                    : 0;
            passSaveParams.salaryTypeId =
                this.EmployeeForm.value['selectedSalaryType'] != undefined &&
                this.EmployeeForm.value['selectedSalaryType'] != null
                    ? this.EmployeeForm.value['selectedSalaryType'].salaryTypeId
                    : 0;
            passSaveParams.locationId =
                this.EmployeeForm.value['locationId'] != null
                    ? this.EmployeeForm.value['locationId']
                    : 0;
            passSaveParams.shiftId =
                this.EmployeeForm.value['selectedShift'] != undefined &&
                this.EmployeeForm.value['selectedShift'] != null
                    ? this.EmployeeForm.value['selectedShift'].shiftId
                    : 0;
            passSaveParams.designationId =
                this.EmployeeForm.value['selectedDesignation'] != undefined &&
                this.EmployeeForm.value['selectedDesignation'] != null
                    ? this.EmployeeForm.value['selectedDesignation']
                          .designationId
                    : 0;

            // education
            passSaveParams.educationDetail = this.EducationDetailList;
            passSaveParams.experienceDetail = this.ExperienceDetailList;
            // passSaveParams.educationDtlId=this.EmployeeForm.value['educationDtlId'] !=null?this.EmployeeForm.value['educationDtlId']:0;
            // passSaveParams.employeeId=this.EmployeeForm.value['employeeId'] !=null?this.EmployeeForm.value['employeeId']:0;
            // passSaveParams.qualificationId=(this.EmployeeForm.value['selectedQualification'] !=undefined && this.EmployeeForm.value['selectedQualification'] !=null)
            // ?this.EmployeeForm.value['selectedQualification'].qualificationId:0;
            // passSaveParams.courseId=(this.EmployeeForm.value['selectedCourse'] !=undefined && this.EmployeeForm.value['selectedCourse'] !=null)
            // ?this.EmployeeForm.value['selectedCourse'].courseId:0;
            // passSaveParams.specialisationId=(this.EmployeeForm.value['selectedSpecialisation'] !=undefined && this.EmployeeForm.value['selectedSpecialisation'] !=null)
            // ?this.EmployeeForm.value['selectedSpecialisation'].specialisationId:0;
            // passSaveParams.schoolCollege=this.EmployeeForm.value['schoolCollege'] !=null?this.EmployeeForm.value['schoolCollege']:"";
            // passSaveParams.percentage=this.EmployeeForm.value['percentage']!=null?this.EmployeeForm.value['percentage']:0;
            // passSaveParams.yearOfPassing=this.EmployeeForm.value['yearOfPassing']!=null?this.EmployeeForm.value['yearOfPassing']:0;
            // passSaveParams.modeOfStudyId=(this.EmployeeForm.value['selectedModeOfStudy'] !=undefined && this.EmployeeForm.value['selectedModeOfStudy'] !=null)
            // ?this.EmployeeForm.value['selectedModeOfStudy'].modeOfStudyId:0;
            // passSaveParams.isActive=this.EmployeeForm.value['isActive']!=null?this.EmployeeForm.value['isActive']:"";

            passSaveParams.isActive =
                this.EmployeeForm.value['isActive'] != null
                    ? this.EmployeeForm.value['isActive']
                    : true;
            passSaveParams.companyId =
                this.EmployeeForm.value['companyId'] != null
                    ? this.EmployeeForm.value['companyId']
                    : 0;
            passSaveParams.unitId =
                this.EmployeeForm.value['unitId'] != null
                    ? this.EmployeeForm.value['unitId']
                    : 0;
            passSaveParams.userId =
                this.EmployeeForm.value['userId'] != null
                    ? this.EmployeeForm.value['userId']
                    : 0;
            passSaveParams.ipAddress =
                this.EmployeeForm.value['ipAddress'] != null
                    ? this.EmployeeForm.value['ipAddress']
                    : '';

            // passSaveParams.educationDetail=this.EmployeeForm.value['e']

            console.log(JSON.stringify(passSaveParams));
        } catch (error) {}
    }

    Clear() {
        this.EmployeeForm.reset();
    }

    RedirecttoList() {
        this.router.navigate(['/apps/pms/employee/employee-list']);
    }

    // Education

    public AddEducationRows() {
        if (
            this.EmployeeForm.value['selectedQualification'] != null &&
            this.EmployeeForm.value['selectedCourse'] != null &&
            this.EmployeeForm.value['selectedSpecialisation'] != null &&
            this.EmployeeForm.value['schoolCollege'] != null &&
            this.EmployeeForm.value['selectedModeOfStudy'] != null &&
            this.EmployeeForm.value['percentage'] != null &&
            this.EmployeeForm.value['yearOfPassing'] != null
        ) {
            try {
                this.isValidation = true;
                // this.ValidationMsg = "";

                if (this.isValidation) {
                    let dataBind: any = {};
                    dataBind.educationDtlId =
                        this.EmployeeForm.value['educationDtlId'] != null
                            ? this.EmployeeForm.value['educationDtlId']
                            : '';
                    dataBind.employeeId =
                        this.EmployeeForm.value['employeeId'] != null
                            ? this.EmployeeForm.value['employeeId']
                            : '';
                    dataBind.qualificationId =
                        this.EmployeeForm.value['selectedQualification'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedQualification'] != null
                            ? this.EmployeeForm.value['selectedQualification']
                                  .qualificationId
                            : 0;
                    dataBind.courseId =
                        this.EmployeeForm.value['selectedCourse'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedCourse'] != null
                            ? this.EmployeeForm.value['selectedCourse'].courseId
                            : 0;
                    dataBind.specialisationId =
                        this.EmployeeForm.value['selectedSpecialisation'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedSpecialisation'] !=
                            null
                            ? this.EmployeeForm.value['selectedSpecialisation']
                                  .specialisationId
                            : 0;
                    dataBind.schoolCollege =
                        this.EmployeeForm.value['schoolCollege'] != null
                            ? this.EmployeeForm.value['schoolCollege']
                            : '';
                    dataBind.percentage =
                        this.EmployeeForm.value['percentage'] != null
                            ? this.EmployeeForm.value['percentage']
                            : 0;
                    dataBind.yearOfPassing =
                        this.EmployeeForm.value['yearOfPassing'] != null
                            ? this.EmployeeForm.value['yearOfPassing']
                            : null;
                    dataBind.modeOfStudyId =
                        this.EmployeeForm.value['selectedModeOfStudy'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedModeOfStudy'] != null
                            ? this.EmployeeForm.value['selectedModeOfStudy']
                                  .modeOfStudyId
                            : 0;
                    dataBind.isActive =
                        this.EmployeeForm.value['isActive'] != null
                            ? this.EmployeeForm.value['isActive']
                            : false;

                    // Extra
                    dataBind.qualificationName =
                        this.EmployeeForm.value['selectedQualification'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedQualification'] != null
                            ? this.EmployeeForm.value['selectedQualification']
                                  .qualificationName
                            : '';
                    dataBind.courseName =
                        this.EmployeeForm.value['selectedCourse'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedCourse'] != null
                            ? this.EmployeeForm.value['selectedCourse']
                                  .courseName
                            : '';
                    dataBind.specialisationName =
                        this.EmployeeForm.value['selectedSpecialisation'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedSpecialisation'] !=
                            null
                            ? this.EmployeeForm.value['selectedSpecialisation']
                                  .specialisationName
                            : '';
                    dataBind.modeOfStudy =
                        this.EmployeeForm.value['selectedModeOfStudy'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedModeOfStudy'] != null
                            ? this.EmployeeForm.value['selectedModeOfStudy']
                                  .courseTypeName
                            : '';
                    dataBind.isActive = true;

                    this.EducationDetailList.push(dataBind);
                    //   console.log(this.EducationDetailList);
                } else {
                    this.notificationsService(
                        PMSValidation.NOTIFICATION_VALIDATION,
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
                'Please fill in all required information'
            );
        }

    }

    ClearEducationRows(){
            const {selectedQualification,selectedCourse,selectedSpecialisation,schoolCollege,selectedModeOfStudy,percentage,yearOfPassing}=this.EmployeeForm.value;

            if(selectedQualification!=null && selectedQualification!=undefined ){
                this.EmployeeForm.get('selectedQualification')?.setValue("");
                this.EmployeeForm.get('selectedCourse')?.setValue("");
                this.EmployeeForm.get('selectedSpecialisation')?.setValue("");
                this.EmployeeForm.get('schoolCollege')?.setValue("");
                this.EmployeeForm.get('selectedModeOfStudy')?.setValue("");
                this.EmployeeForm.get('percentage')?.setValue("");
                this.EmployeeForm.get('yearOfPassing')?.setValue(null);

            }

    }

    EditEducationRows(item: any) {
        this.EmployeeForm.get('selectedQualification')?.setValue(
            this.QualificationList.find(
                (val) => val.qualificationId === item.qualificationId
            )
        );
        this.EmployeeForm.get('selectedCourse')?.setValue(
            this.CourseList.find((val) => val.courseId === item.courseId)
        );
        this.EmployeeForm.get('selectedSpecialisation')?.setValue(
            this.SpecialisationList.find(
                (val) => val.specialisationId === item.specialisationId
            )
        );
        this.EmployeeForm.get('selectedModeOfStudy')?.setValue(
            this.CourseTypeList.find(
                (val) => val.modeOfStudyId === item.modeOfStudyId
            )
        );
        this.EmployeeForm.controls['schoolCollege']?.setValue(
            item.schoolCollege
        );
        this.EmployeeForm.controls['percentage']?.setValue(item.percentage);
        this.EmployeeForm.controls['yearOfPassing']?.setValue(
            item.yearOfPassing
        );

        // this.ModuleCreationForm.get("application")?.setValue(this.ApplicationList.find(app => app.applicationId === item.applicationId));
    }

    RemoveEducationRows(data: any, index: number) {
        // this.deleteDialog=true;
        try {
            // if(+data.educationDtlId !=0){
            //     this.DeletedEducationDtls.push(data);
            // }
            this.EducationDetailList.splice(index, 1);
            // this.EducationDetailList=[...this.EducationDetailList]
        } catch (error) {}
    }

    EducationListconfirmDelete() {}

    // Experience
    AddExperienceRows() {
        if (
            this.EmployeeForm.value['companyName'] != null &&
            this.EmployeeForm.value['fromDate'] != null &&
            this.EmployeeForm.value['toDate'] != null &&
            this.EmployeeForm.value['experience'] != null &&
            this.EmployeeForm.value['selectedJobTitle'] != null &&
            this.EmployeeForm.value['reasonForChange'] != null
        ) {
            try {
                this.isValidation = true;
                if (this.isValidation) {
                    let dataBind: any = {};
                    dataBind.workExperienceDtlId =
                        this.EmployeeForm.value['workExperienceDtlId'] != null
                            ? this.EmployeeForm.value['workExperienceDtlId']
                            : '';
                    dataBind.employeeId =
                        this.EmployeeForm.value['employeeId'] != null
                            ? this.EmployeeForm.value['employeeId']
                            : '';
                    dataBind.companyName =
                        this.EmployeeForm.value['companyName'] != null
                            ? this.EmployeeForm.value['companyName']
                            : '';
                    dataBind.fromDate =
                        this.EmployeeForm.value['fromDate'] != null
                            ? this.EmployeeForm.value['fromDate']
                            : null;
                    dataBind.toDate =
                        this.EmployeeForm.value['toDate'] != null
                            ? this.EmployeeForm.value['toDate']
                            : null;
                    dataBind.experience =
                        this.EmployeeForm.value['experience'] != null
                            ? this.EmployeeForm.value['experience']
                            : 0;
                    dataBind.jobTitleId =
                        this.EmployeeForm.value['selectedJobTitle'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedJobTitle'] != null
                            ? this.EmployeeForm.value['selectedJobTitle']
                                  .jobTitleId
                            : 0;
                    dataBind.jobDesc =
                        this.EmployeeForm.value['jobDesc'] != null
                            ? this.EmployeeForm.value['jobDesc']
                            : '';
                    dataBind.reasonForChange =
                        this.EmployeeForm.value['reasonForChange'] != null
                            ? this.EmployeeForm.value['reasonForChange']
                            : '';
                    dataBind.isActive =
                        this.EmployeeForm.value['isActive'] != null
                            ? this.EmployeeForm.value['isActive']
                            : false;
                    // Extra
                    dataBind.jobTitleName =
                        this.EmployeeForm.value['selectedJobTitle'] !=
                            undefined &&
                        this.EmployeeForm.value['selectedJobTitle'] != null
                            ? this.EmployeeForm.value['selectedJobTitle']
                                  .jobTitleName
                            : '';
                    dataBind.isActive = true;

                    this.ExperienceDetailList.push(dataBind);

                    console.log(this.ExperienceDetailList);
                } else {
                    this.notificationsService(
                        PMSValidation.NOTIFICATION_VALIDATION,
                        'Validation Message',
                        this.ValidationMsg
                    );
                }
            } catch (error) {}
        } else {
            this.notificationsService(
                PMSValidation.NOTIFICATION_VALIDATION,
                'Validation Message',
                'Please fill in all required information'
            );
        }

    }

    ClearExperienceRows(){
            const{companyName,fromDate,toDate,experience,selectedJobTitle,jobDesc,reasonForChange}=this.EmployeeForm.value;

            if(companyName!=null &&  companyName!=undefined ){

                this.EmployeeForm.get('companyName')?.setValue("");
                this.EmployeeForm.get('fromDate')?.setValue(null);
                this.EmployeeForm.get('toDate')?.setValue(null);
                this.EmployeeForm.get('experience')?.setValue(0);
                this.EmployeeForm.get('selectedJobTitle')?.setValue("");
                this.EmployeeForm.get('jobDesc')?.setValue("");
                this.EmployeeForm.get('reasonForChange')?.setValue("");
                this.EmployeeForm.get('companyName')?.setValue("");
                this.EmployeeForm.get('companyName')?.setValue("");
                this.EmployeeForm.get('companyName')?.setValue("");
                this.EmployeeForm.get('companyName')?.setValue("");

            }
            
    }

    EditExperienceRows(item: any) {
        console.log('EditExperienceRows ', item);
        this.EmployeeForm.controls['companyName']?.setValue(item.companyName);
        this.EmployeeForm.controls['fromDate']?.setValue(item.fromDate);
        this.EmployeeForm.controls['toDate']?.setValue(item.toDate);
        this.EmployeeForm.controls['experience']?.setValue(item.experience);
        // this.EmployeeForm.get('selectedQualification')?.setValue(this.QualificationList.find(val=>val.qualificationId === item.qualificationId));
        this.EmployeeForm.get('selectedJobTitle')?.setValue(
            this.employeeCategoryList.find(
                (val) => val.empCategoryId === item.empCategoryId
            )
        );
        this.EmployeeForm.controls['jobDesc']?.setValue(item.jobDesc);
        this.EmployeeForm.controls['reasonForChange']?.setValue(
            item.reasonForChange
        );
    }



    RemoveExperienceRows(data: any, index: number) {
        // this.deleteDialog=true;
        this.ExperienceDetailList.splice(index, 1);
    }

    ExperienceListconfirmDelete() {}

    //#region  EDUCATION DETAIL
    AddEducation() {}

    openEducationDialog() {
        this.educationDialog = true;
    }

    hideEducationDialog() {
        this.educationDialog = false;
    }

    //#endregion

    //#region Employee Image
    getSelectedFile($event: any) {
        if ($event.length === 0) {
            return;
        }

        for (var i = 0; i < $event.target.files.length; i++) {
            // #region Validation
            var mimeType = $event.target.files[i].type;
            if (mimeType.match(/image\/*/) == null) {
                this.notificationsService(
                    PMSValidation.NOTIFICATION_VALIDATION,
                    'Validation',
                    'Only images are supported.'
                );
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
            this.selectedEmployeeImageURL = reader.result;
        };
        //#endregion
    }

    ValidateSelectedFile(name: String) {
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (
            ext.toLowerCase() == 'png' ||
            ext.toLowerCase() == 'jpg' ||
            ext.toLowerCase() == 'jpeg'
        ) {
            return true;
        } else {
            return false;
        }
    }
    //#endregion

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

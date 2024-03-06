import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Table } from 'primeng/table';

import { ICourse, IQualification, IEducationDetail, IEmployee, ISpecialization, ICourseType, ISalutation, IGender, IBloodGroup } from 'src/app/+pms/services/interfaces/IEmployee';


import * as yup from 'yup';
import { YupPMSValidation } from 'src/app/+pms/services/validation-schemas/yup-pms-validation';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';

import { UtilService } from 'src/app/shared/util.service';
import { IState } from 'src/app/shared/interface/IState';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

import * as _ from 'lodash';

import { MessageService } from 'primeng/api';
import { PMSValidation } from 'src/app/+pms/services/pms-validation';
import { CommonService } from 'src/app/shared-services/common.service';
import { PMSAPIConfig } from 'src/app/+pms/services/pms-api-config';





interface Product {
    name: string;
    price: string;
    code: string;
    sku: string;
    status: string;
    tags: string[];
    category: string;
    colors: string[];
    stock: string;
    inStock: boolean;
    description: string;
    images: Image[];
}

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
    categoryOptions = ['Sneakers', 'Apparel', 'Socks'];

    colorOptions: any[] = [
        { name: 'Blange', background: 'bg-orange-500' },
        { name: 'Naack', background: 'bg-gray-900' },
        { name: 'Orvy', background: 'bg-blue-500' },
    ];

    product: Product = {
        name: '',
        price: '',
        code: '',
        sku: '',
        status: 'Draft',
        tags: ['Nike', 'Sneaker'],
        category: 'Sneakers',
        colors: ['Blue'],
        stock: 'Sneakers',
        inStock: true,
        description: '',
        images: [],
    };

    uploadedFiles: any[] = [];

    showRemove: boolean = false;

    // Family Information

    genderOptions: any[] = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ];

    // Save
    public buttonText: string = 'Save';

    //   Grid List by mj tamil

    cols: any[] = [];
    selectedItems: any[] = [];
    items: any[] = [];
    filteredMiscDetailList: IEmployee[] = [];

    // AutoComplete
    StateList: IState[] = [];
    permanantStateList: IState[] = [];
    CoutryList: ICountry[] = [];
    permanantCoutryList: ICountry[] = [];

    //#region UI VALIDATION VARIABLES
    //  Step 1
    EmployeeForm: FormGroup<YupFormControls<IEmployee>>;

    // Step 2 INITIALIZER
    initialValues: IEmployee = {
        
    employeeId:  null ,
    // Personal Info
    employeeNo:  null ,
    salutationId:  null ,
    selectedSalutation:null,
    firstName:  null ,
    lastName:  null ,
    nickName:  null ,
    genderId:  null ,
    selectedGender: null ,
    dob:  null ,
    age:  null ,

     // Present Address
    address1:  null ,
    address2:  null ,
    address3:  null ,
    city:  null ,
    stateId:  null ,
    selectedState: null ,
    countryId:  null ,
    selectedCountry: null ,
    pinCode:  null ,

    // Permanent Address
    sameasPresent:  null ,
    permanantAddress1:  null ,
    permanantAddress2:  null ,
    permanantAddress3:  null ,
    permanantCity:  null ,
    permanantStateId:  null ,
    permanantSelectedState:  null ,
    permanantCountryId:  null ,
    permanantSelectedCountry:  null ,
    permanantPINCode:  null ,

    contactPerson1:  null ,
    contactPersonMobileNo1:  null ,
    contactPerson2:  null ,
    contactPersonMobileNo2:  null ,
    bloodGroupId:  null ,
    selectedBloodGroup: null ,

    // Unique Number Info
    panNo:  null ,
    uanNo:  null ,
    // passportNo:  null , //  
    // passportExpDt:  null ,  //
    // drivingLicenseNo:  null , //  
    // drivingLicenseExpDt:  null ,  //
    aadhaarNo:  null ,
    esiNo:  null ,
    epfNo:  null ,
    nationalityId:  null ,
    selectedNationality:  null ,
    communityId:  null ,
    selectedCommunity:  null ,
    // jobDescription:  null ,
    // aboutMe:  null ,
    // identyMarks1:  null ,
    // identyMarks2:  null ,

    //  Organizational Info
    officialEmail:  null ,
    officialMobile:  null ,
    dateofJoin:  null ,
    empCategoryId:  null ,
    selectedEmployeeCategory:  null ,
    departmentId:  null ,
    selectedDepartment:  null ,
    sectionId:  null ,
    selectedSection:  null ,
    
    employeementTypeId:  null ,
    selectedEmployeementType:  null ,
    reportingToId:  null ,
    selectedReportingTo:  null ,
    salaryTypeId:  null ,
    selectedSalaryType:  null ,
    locationId:  null ,
    selectedLocation:  null ,
    shiftId:  null ,
    selectedShift:  null ,
    designationId:  null ,
    selectedDesignation:  null ,
    
    isActive:  null ,
    companyId:  null ,
    unitId:  null ,
    userId:  null ,
    ipAddress:  null ,
    };

    // Step 3 VALIDATION
    validationSchema: yup.ObjectSchema<IEmployee> = YupPMSValidation.EMPLOYEE;

    // Step 4 FORM ERROR
    formError = (controlName: string, formName: any) => {
        return this.utilService.formError(controlName, formName);
    };
    //#endregion

    salutationList : ISalutation[] = [];
    genderList : IGender[] = [];
    bloodGroupList : IBloodGroup[] = [];

    //#region EDUCATION DETAIL
    eduAddSubmitted: boolean = false;
    educationDialog: boolean = false;

    educationDetail: IEducationDetail = {};
    educationDetails: IEducationDetail[] = [];
    selectedEducationDetail: IEducationDetail[] = [];

    QualificationList: IQualification[] = []; // DDL
    CourseList: ICourse[] = []; // DDL
    SpecializationList: ISpecialization[] = []; // DDL
    CourseTypeList: ICourseType[] = []; // DDL
    //#endregion

    //#region WORK EXPERIENCE DETAIL
    wrkAddSubmitted: boolean = false;
    workExperienceDialog: boolean = false;


    //#endregion

    ImageFiles: string[] = [];
    public ImagePath: string | undefined = "";
    selectedEmployeeImageURL: any = "assets/demo/images/avatar/emp.jpg";

    constructor(
        private utilService: UtilService,
        private router: Router,
        private httpService: CommonHttpService,
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
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
            this.httpService.globalGet(PMSAPIConfig.API_CONFIG.API_URL.MASTER.EMPLOYEE.DATA)
                .subscribe({
                    next: (result: any) => {
                        console.log('fetchEmployeesData()', result.loadEmployeesData);
                        this.EmployeeForm.controls['employeeNo']?.setValue(result.loadEmployeesData.autoGenerateNo[0].autoGenerateNo);
                        this.EmployeeForm.controls['employeeNo']?.disable();

                        const bloodGroups = _.filter(result.loadEmployeesData.miscDtl, val => {
                            return val.miscId == 1;
                        });
                        this.bloodGroupList = bloodGroups.map(x => { return <IBloodGroup>{ bloodGroupId: x.miscDtlId, bloodGroupName: x.miscDtlName } });


                    },
                    error: (err: HttpErrorResponse) => console.log(err)
                });
        } catch (error) {
        }
    }

    onChipRemove(item: string) {
        this.product.tags = this.product.tags.filter((i) => i !== item);
    }

    onColorSelect(color: string) {
        this.product.colors.indexOf(color) == -1
            ? this.product.colors.push(color)
            : this.product.colors.splice(this.product.colors.indexOf(color), 1);
    }

    onUpload(event: any) {
        for (let file of event.files) {
            this.product.images.push(file);
        }
    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach((el) => {
            el.nativeElement.id === file.name
                ? (el.nativeElement.style.display = 'flex')
                : null;
        });
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach((el) => {
            el.nativeElement.id === file.name
                ? (el.nativeElement.style.display = 'none')
                : null;
        });
    }

    removeImage(file: Image) {
        this.product.images = this.product.images.filter((i) => i !== file);
    }

    //   Drop down by mj tamil

    filterMagePage(event: AutoCompleteCompleteEvent) { }

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
            this.commonService.getCountries().then(res => {
                 this.CoutryList = res;
                 this.permanantCoutryList = res;
            });
        } catch (error) {

        }
    }
    //  #endregion

    // #region States
    public GetStates() {
        try {
            this.commonService.getStates().then(res => { 
                this.StateList = res;
                this.permanantStateList = res;
            });
        } catch (error) {
        }
    }

    //  #endregion


    Save() { }


    Clear() { }


    RedirecttoList() {
        this.router.navigate(['/apps/pms/employee/employee-list']);
    }


    // Education 

    AddEducationRows() {

    }


    RemoveEducationRows(data: any, index: number) {

    }


    // Experience
    AddWorkExperience() {

    }

    RemoveWorkExperienceRows(data: any, index: number) {

    }



    //#region  EDUCATION DETAIL
    AddEducation() {

    }

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
                this.notificationsService(PMSValidation.NOTIFICATION_VALIDATION, 'Validation', "Only images are supported.")
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
        }
        //#endregion

    }


    ValidateSelectedFile(name: String) {
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
            return true;
        }
        else {
            return false;
        }
    }
    //#endregion

    private notificationsService(_severity: any, _summary: any, _message: any) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
        return;
    }

}

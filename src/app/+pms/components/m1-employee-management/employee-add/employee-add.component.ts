import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Table } from 'primeng/table';

import { APIConfig } from 'src/app/config/api.config';
import { ICourse, IQualification, IEducationDetail, IEmployee, ISpecialization, ICourseType } from 'src/app/+pms/services/interfaces/IEmployee';


import * as yup from 'yup';
import { YupPMSValidation } from 'src/app/+pms/services/validation-schemas/yup-pms-validation';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';

import { UtilService } from 'src/app/shared/util.service';
import { IState } from 'src/app/shared/interface/IState';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

import * as _ from 'lodash';
import { IMiscDetails } from 'src/app/shared/interface/IMisc';

import { MessageService } from 'primeng/api';
import { PMSValidation } from 'src/app/+pms/services/pms-validation';
import { ProductService } from 'src/app/demo/service/product.service';





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
    filteredMiscDetailList:IEmployee[]=[];

    allCountries:ICountry[]=[];
    countriesData: ICountry = {};
    // AutoComplete By mj tamil
    filteredStateList: IState[] = [];
    StateList: IState[] = [];

    CoutryList: ICountry[] = [];
    filteredCoutryList: ICountry[] = [];

    //#region UI Validation Variables
    //  Step 1
    EmployeeForm: FormGroup<YupFormControls<IEmployee>>;

    // Step 2 Initializer
    initialValues: IEmployee = {
        employeeId: null,

        // Personal Info

        employeeNo: null,
        firstName: null,
        lastName: null,
        nickName: null,
        genderId: null,
        dob: null,
        age: null,

        // Present Address

        address1: null,
        address2: null,
        address3: null,
        city: null,
        stateId: null,

        countryId: null,
        // selectedPresentCountry: null,
        pinCode: null,

        // Permanent Address
        sameasPresent:null,
        permanantAddress1: null,
        permanantAddress2: null,
        permanantAddress3: null,
        permanantCity: null,
        permanantStateId: null,
        permanantCountryId: null,
        permanantPINCode: null,

        //  Organizational Info
        officialEmail: null,
        officialMobile: null,
        dateOfJoin: null,
        employeeCategory: null,
        deptSection: null,
        production: null,
        typeOfEmployment: null,
        reportingTo: null,
        salaryType: null,
        workingLocation: null,
        shift: null,
        designationJobTitle: null,

        //  Emergency Contact Info

        contactPerson1: null,
        contactPersonMobileNo1: null,
        contactPerson2: null,
        contactPersonMobileNo2: null,
        bloodGroupId: null,

        // Unique Number Info
        nationalityId: null,
        panNo: null,
        uanNo: null,
        aadhaarNo: null,
        esiNo: null,
        epfNo: null,
        communityId: null,

        // Family Information

        selectedGender: null,
        isActive: null,
        unitId: null,
        userId: null,
        ipAddress: null,
    };

    // Step 3 Validation

    validationSchema: yup.ObjectSchema<IEmployee> = YupPMSValidation.EMPLOYEE;

    // Step 4 Form Error

    formError = (controlName: string, formName: any) => {
        return this.utilService.formError(controlName, formName);
    };


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
        // private activatedRoute: ActivatedRoute,
        private productService:ProductService
    ) {
        this.EmployeeForm = FormHandler.controls<IEmployee>(this.initialValues);
        this.EmployeeForm.setValidators(
            FormHandler.validate<IEmployee>(this.validationSchema)
        );
    }

    ngOnInit() {
        this.GetCountries();
        this.GetStates();
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
        this.productService.getCountries().then((data)=>{
            console.log(data);
            
            this.allCountries=data;
            console.log("All countries",this.allCountries);
            
        })
       } catch (error) {
        
       }
    }


    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;


        for (let i = 0; i < (this.CoutryList as any[]).length; i++) {
            let _countriesList = (this.CoutryList as any[])[i];
            if (
                _countriesList.countryName
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(_countriesList);
            }
        }
        this.filteredCoutryList = filtered;
    }
    //  #endregion

    // #region States
    public GetStates() {
        try {
            this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_STATES)
                .subscribe({
                    next: (result: any) => {
                        this.StateList = result.states;
                        // console.log('GetStates', this.GetStates);

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
            if (
                _stateList.stateName
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(_stateList);
            }
        }
        this.filteredStateList = filtered;
    }

    onSelectState() {
        if (
            this.EmployeeForm.value['stateId'] != undefined &&
            this.EmployeeForm.value['stateId'] != null
        ) {
            let _countryId: number =
                this.EmployeeForm.value['stateId'].countryId;
            this.EmployeeForm.get('countryId')?.setValue(
                this.CoutryList.find((c) => c.countryId === _countryId)
            );
        } else {
            this.EmployeeForm.get('countryId')?.setValue(null);
        }
    }

    onClearState() {
        console.log('OnClearState', this.EmployeeForm);
        this.EmployeeForm.get('countryId')?.reset();
    }
    //  #endregion






    Save() { }


    Clear() { }


    RedirecttoList() {
        this.router.navigate(['/apps/pms/employee/employee-list']);
    }


    // Education 

    AddEducationRows(){
        
    }

    
    RemoveEducationRows(data:any,index:number){

    }


    // Experience
    AddWorkExperience(){

    }

    RemoveWorkExperienceRows(data:any,index:number){

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

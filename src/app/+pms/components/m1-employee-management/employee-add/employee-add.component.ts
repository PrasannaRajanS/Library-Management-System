import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Table } from 'primeng/table';

import { APIConfig } from 'src/app/config/api.config';
import { IEmployee } from 'src/app/+pms/services/interfaces/IEmployee';


import * as yup from 'yup';
import { YupPMSValidation } from 'src/app/+pms/services/validation-schemas/yup-pms-validation';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';

import { UtilService } from 'src/app/shared/util.service';
import { IState } from 'src/app/shared/interface/IState';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import * as _ from 'lodash';
import { IMiscDetails } from 'src/app/shared/interface/IMisc';




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
        { name: 'Black', background: 'bg-gray-900' },
        { name: 'Orange', background: 'bg-orange-500' },
        { name: 'Navy', background: 'bg-blue-500' },
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

        employeeNumber: null,
        firstName: null,
        lastName: null,
        nickName: null,
        gender: null,
        DOB: null,
        age: null,

        // Present Address

        presentAddress1: null,
        presentAddress2: null,
        presentAddress3: null,
        presentCity: null,
        selectedPresentState: null,

        presentCountryId: null,
        selectedPresentCountry: null,
        presentPIN: null,

        // Permanent Address

        permanentAddress1: null,
        permanentAddress2: null,
        permanentAddress3: null,
        permanentCity: null,
        permanentState: null,
        permanentCountry: null,
        permanentPIN: null,

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
        mobileNo1: null,
        contactPerson2: null,
        mobileNo2: null,
        bloodGroup: null,

        // Unique Number Info
        nationality: null,
        PANNo: null,
        community: null,
        aadhaarNo: null,
        UANNo: null,
        ESINo: null,
        EPFNo: null,

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
   

    constructor(private utilService: UtilService,       
         private router: Router,
         private httpService : CommonHttpService) {
        this.EmployeeForm = FormHandler.controls<IEmployee>(this.initialValues);
        this.EmployeeForm.setValidators(
            FormHandler.validate<IEmployee>(this.validationSchema)
        );
    }

    ngOnInit(){
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

    filterMagePage(event: AutoCompleteCompleteEvent) {}

    //   Grid List by mj tamil

    // for Filter
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    // Filter

    // GetCountries

    public GetCountries(){
        try {
            this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_COUNTRIES)
            .subscribe(
                {
                    next:(result :any)=>{
                        this.CoutryList = result.countries;
                        // console.log('GetCountries',this.CoutryList);
                        
                    },
                    error: (err: HttpErrorResponse) =>console.log(err)
                    
                }
            )
        } catch (error) {
            
        }
    }

     // auto complete Country

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


    // GetStates

    public GetStates(){
        try {
            this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_STATES)
            .subscribe({
                next: (result : any) =>{
                    this.StateList = result.states;
                    // console.log('GetStates', this.GetStates);

                },
                error: (err:HttpErrorResponse) =>console.log(err)
                
            })
        } catch (error) {
            
        }
    }





    // auto complete state

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

    //

    onSelectState() {
        if (
            this.EmployeeForm.value['selectedPresentState'] != undefined &&
            this.EmployeeForm.value['selectedPresentState'] != null
        ) {
            let _countryId: number =
                this.EmployeeForm.value['selectedPresentState'].countryId;
            this.EmployeeForm.get('selectedPresentCountry')?.setValue(
                this.CoutryList.find((c) => c.countryId === _countryId)
            );
        } else {
            this.EmployeeForm.get('selectedPresentCountry')?.setValue(null);
        }
    }

    onClearState() {
        console.log('OnClearState', this.EmployeeForm);
        this.EmployeeForm.get('selectedPresentCountry')?.reset();
    }

   
    // Save

    Save() {}

    // Clear

    Clear() {}

    // List Link

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
    
}

import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';
import { IStatePMS } from 'src/app/+pms/services/interfaces/IStatePMS';

import { IEmployee } from 'src/app/+pms/services/interfaces/IEmployee';

import { YupPMSValidation } from 'src/app/+pms/services/validation-schemas/yup-pms-validation';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';

import { UtilService } from 'src/app/shared/util.service';

import * as yup from 'yup';
import { ICountryPMS } from 'src/app/+pms/services/interfaces/ICountryPMS';

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
      { label: 'Other', value: 'other' }
    ];

    // Save
public buttonText:string="Save";


    //   Grid List by mj tamil

    cols: any[] = [];
    selectedItems: any[] = [];
    items: any[] = [];

    // AutoComplete By mj tamil
    filteredStateList: IStatePMS[] = [];
    StateList: IStatePMS[] = [];

    CoutryList: ICountryPMS[] = [];
    filteredCoutryList: ICountryPMS[] = [];

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
        presentState: null,
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

        selectedGender:null,




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
    // formError = (controlName: string, formName: any) => {
    //     //  Step 4
    //     return this.utilService.formError(controlName, formName);
    // };

    constructor(private utilService: UtilService,
        private router:Router) {
        this.EmployeeForm = FormHandler.controls<IEmployee>(this.initialValues);
        this.EmployeeForm.setValidators(
            FormHandler.validate<IEmployee>(this.validationSchema)
        );
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


    // auto complete state

    // Filter

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
            this.EmployeeForm.value['presentState'] != undefined &&
            this.EmployeeForm.value['presentState'] != null
        ) {
            let _countryId: number =
                this.EmployeeForm.value['presentState'].countryId;
            this.EmployeeForm.get('selectedPresentCountry')?.setValue(this.CoutryList.find((c) => c.countryId === _countryId));
        } else {
            this.EmployeeForm.get('selectedPresentCountry')?.setValue(null)
        }
    }

    onClearState() {
        console.log('OnClearState', this.EmployeeForm);
        this.EmployeeForm.get('presentCountry')?.reset();
    }
    

    // Save

    Save(){

    }

    // Clear

    Clear(){

    }

    // List Link

    RedirecttoList(){
        this.router.navigate(['/apps/pms/employee/employee-list'])
    }

}

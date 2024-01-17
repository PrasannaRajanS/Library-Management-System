import { Component } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UtilService } from 'src/app/shared/util.service';
import { HttpService } from '../../services/http.service';
import { MessageService } from 'primeng/api';

import { AdminAPIConfig } from '../../services/admin-api-config';
import { IApplication } from '../../api/application';

import { FormGroup } from '@angular/forms';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { IUnit, IUser } from '../../services/interfaces/IUser';
import { YupAdminValidation } from '../../services/validation-schemas/yup-page-creation';
import * as yup from "yup";
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { IRole } from '../../services/interfaces/IRole';

@Component({
    selector: 'app-user-creation',
    templateUrl: './user-creation.component.html',
    styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent {
    
    //#region UI validation declarations 
    UserCreationForm: FormGroup<YupFormControls<IUser>>;  //  Step 1

    initialValues: IUser = { //  Step 2
        userId: null,
        userName: null,
        password: null,

        employeeId: null,
        employeeName:null,
        employee: null,

        description: null,

        pageId: null,   //  for Default Page Id
        pageName: null,   //  for Default Page
        page:null,

        applicationId: null,
        applicationName:null,
        application: null,

        roleId: null,
        roleName:null,
        role: null,

        email: null,
        phoneNumber: null,

        isActive: null,
        loggedinUserId: null,
        ipAddress: null,
        selectedUnits:null
    }

    validationSchema: yup.ObjectSchema<IUser> = YupAdminValidation.USER_CREATION;  //  Step 3

    formError = (controlName: string, formName: any) => {   //  Step 4
        return this.UtilService.formError(controlName, formName);
    };
    //#endregion 
  
  
    ApplicationList: IApplication[] = [];
    
    EmployeesList: IUser[] = [];
    filteredEmployeeList: IUser[] = [];

    DefaultPagesList: IUser[] = [];
    filteredPageList: IUser[] = [];

    RoleList: IRole[] = [];
    public selectedRole: any = null;
    filteredRoleList: IRole[] = [];

    UnitList: IUnit[] = [];
    public selectedUnits: any = null;
    
    //#region Password
    fieldTextType: boolean = false;



    countries: any[] = [];

    cities: any[];

    filteredCountries: any[] = [];

    value1: any;

    value2: any;

    value3: any;

    value4: any;

    value5: any;

    value6: any;

    value7: any;

    value8: any;

    value9: any;

    value10: any;

    value11: any;

    value12: any;

    
    submitted: boolean = false;

    constructor(
        private UtilService: UtilService,
        private httpService: HttpService,
        private messageService: MessageService,
        private router: Router,
        private activatedRoute: ActivatedRoute,

        private countryService: CountryService
    ) {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        this.toggleFieldTextType();

        this.UserCreationForm = FormHandler.controls<IUser>(this.initialValues);    //  Step 4
        this.UserCreationForm.setValidators(FormHandler.validate<IUser>(this.validationSchema));
    }

    ngOnInit() {
        this.LoadApplications();
        this.LoadEmployees();
        this.LoadDefaultPages();
        this.LoadRoles();
        this.LoadUnits();
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });
    }


    public LoadApplications() {

        try {
    
          this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.APPLICATION.LIST)
            .subscribe({
              next: (result: any) => {
                this.ApplicationList = result.applications;
              },
              error: (err: HttpErrorResponse) => console.log(err)
            });
    
        } catch (error) {
    
        }
      }

    public LoadEmployees() {

        try {

            this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.USER.EMPOLOYEES_LIST)
                .subscribe({
                    next: (result: any) => {
                        this.EmployeesList = result.employees;
                    },
                    error: (err: HttpErrorResponse) => console.log(err)
                });

        } catch (error) {

        }
    }

    filterEmployee(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;
    
        for (let i = 0; i < (this.EmployeesList as any[]).length; i++) {
          let mPages = (this.EmployeesList as any[])[i];
          if (mPages.employeeName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(mPages);
          }
        }
    
        this.filteredEmployeeList = filtered;
      }

    public LoadDefaultPages() {

        try {

            this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.USER.DEFAULT_PAGE_LIST)
                .subscribe({
                    next: (result: any) => {
                        this.DefaultPagesList = result.defaultPages;
                    },
                    error: (err: HttpErrorResponse) => console.log(err)
                });

        } catch (error) {

        }
    }

    public LoadRoles() {

        try {
    
          this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.ROLE_CREATION.LIST)
            .subscribe({
              next: (result: any) => {
                this.RoleList = result.roles;
              },
              error: (err: HttpErrorResponse) => console.log(err)
            });
    
        } catch (error) {
    
        }
    
      }

      public LoadUnits() {

        try {
    
          this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.USER.UNIT_LIST)
            .subscribe({
              next: (result: any) => {
                this.UnitList = result.units;
              },
              error: (err: HttpErrorResponse) => console.log(err)
            });
    
        } catch (error) {
    
        }
    
      }

    searchCountry(event: any) {
        // in a real application, make a request to a remote url with the query and
        // return filtered results, for demo we filter at client side
        const filtered: any[] = [];
        const query = event.query;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    saveUsers() {
        this.submitted = true;
    }


    onChangeApplicationName($event: any) {
        // this.filteredModuleList = _.filter(this.ModuleList, m => {
        //   return m.applicationId == $event.value.applicationId;
        // });
    }

    onChangeRole($event: any) {
    }

    onChangePage($event: any) {

    }

      Save(){

      }
}

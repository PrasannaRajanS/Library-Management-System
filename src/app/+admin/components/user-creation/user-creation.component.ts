import { Component } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';

import { UtilService } from 'src/app/shared/util.service';
import { HttpService } from '../../services/http.service';
import { MessageService } from 'primeng/api';

import { AdminAPIConfig } from '../../services/admin-api-config';
import { IApplication } from '../../api/application';

import { FormControl, FormGroup } from '@angular/forms';
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
        employeeName: null,
        employee: null,

        description: null,

        pageId: null,   //  for Default Page Id
        pageName: null,   //  for Default Page
        page: null,

        applicationId: null,
        applicationName: null,
        application: null,

        roleId: null,
        roleName: null,
        role: null,

        email: null,
        phoneNumber: null,

        isActive: null,
        loggedinUserId: null,
        ipAddress: null,
        selectedUnits: null
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


    constructor(
        private UtilService: UtilService,
        private httpService: HttpService,
        private messageService: MessageService,
        private router: Router,
        private activatedRoute: ActivatedRoute,

        private countryService: CountryService
    ) {
        
        this.toggleFieldTextType();

        this.UserCreationForm = FormHandler.controls<IUser>(this.initialValues);    //  Step 4
        this.UserCreationForm.setValidators(FormHandler.validate<IUser>(this.validationSchema));


    }

    ngOnInit() {
        this.LoadApplications();
        this.LoadEmployees();
        this.LoadRoles();
        this.LoadUnits();
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

    public LoadDefaultPages(applicationId: number) {

        try {

            this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.USER.DEFAULT_PAGE_LIST + '/?applicationId=' + applicationId)
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

    

    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    onChangeApplicationName($event: any) {
    
        if ($event.value != null) {

            this.LoadDefaultPages($event.value.applicationId);

            this.filteredRoleList = _.filter(this.RoleList, m => {
                return m.applicationId == $event.value.applicationId;
            });
        }
        else {
            this.filteredRoleList = [];
        }

        console.log('this.DefaultPagesList', this.DefaultPagesList);

        if ($event.value != null) {
            this.filteredPageList = _.filter(this.DefaultPagesList, m => {
                return m.applicationId == $event.value.applicationId;
            });
        }
        else {
            this.filteredPageList = [];
        }

    }

    onSelectEmployee() {
        console.log(this.UserCreationForm.value['employee']);
        this.UserCreationForm.get("userName")?.setValue(this.UserCreationForm.value['employee'].userName);
        this.UserCreationForm.get("email")?.setValue(this.UserCreationForm.value['employee'].email);
        this.UserCreationForm.get("phoneNumber")?.setValue(this.UserCreationForm.value['employee'].phoneNumber);
    }

    onChangeRole($event: any) {

    }

    onChangePage($event: any) {

    }

    Save() {

    }
}

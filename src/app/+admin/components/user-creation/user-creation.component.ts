import { Component } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';

import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';

import { AdminAPIConfig } from '../../services/admin-api-config';
import { IApplication } from './../../services/interfaces/IApplication';

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { IUnit, IUser } from '../../services/interfaces/IUser';
import { YupAdminValidation } from '../../services/validation-schemas/yup-page-creation';
import * as yup from "yup";
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { IRole } from '../../services/interfaces/IRole';
import { AdminValidation } from '../../services/admin-validation';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

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

    UserList: IUser[] = [];

    //#region Save
    buttonText: string = 'Save';
    private IsUpdate: boolean = false;
    public userDetails: any;
    UserId?: number | null | undefined = 0;
    ApplicationId?: number | null | undefined = 0;

    constructor(
        private UtilService: UtilService,
        private httpService: CommonHttpService,
        private messageService: MessageService,
        private router: Router,
        private activatedRoute: ActivatedRoute,

        private countryService: CountryService
    ) {
        

        this.UserCreationForm = FormHandler.controls<IUser>(this.initialValues);    //  Step 4
        this.UserCreationForm.setValidators(FormHandler.validate<IUser>(this.validationSchema));


        this.LoadApplications();
        this.LoadEmployees();
        this.LoadRoles();
        this.LoadUnits();


        this.activatedRoute.queryParams.subscribe((params:any)=>{

            this.UserId = (+(params.id));
            this.ApplicationId = (+(params.applicationId));

            if (this.UserId &&  this.ApplicationId) {

                this.buttonText = "Update";
                this.IsUpdate = true;
    
                /** Update **/
                this.LoadDefaultPages(this.ApplicationId);
                this.fnGetUserById();
                /** Update **/
            }
           
        });

        console.log('this.UserId',this.UserId)
        console.log('this.ApplicationId',this.ApplicationId)
        console.log('this.buttonText',this.buttonText)
        console.log('this.IsUpdate',this.IsUpdate)


        //#region 
        // this.activatedRoute.params.subscribe((params: any) => {

        //     if (params != undefined && !_.isEmpty(params)) {
        //         this.UserId = (+(params.id));
        //         this.ApplicationId = (+(params.applicationId));
        //         this.buttonText = "Update";
        //         this.IsUpdate = true;


        //         /** Update **/
        //         this.fnGetUserById();
        //         this.LoadDefaultPages(this.ApplicationId);
        //         /** Update **/

        //     } else {
        //         this.UserId = 0;
        //         this.IsUpdate = false;
        //     }
        // });
        //#endregion
    }

    ngOnInit() {

    }

    public  fnGetUserById() {

        try {

            this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.USER.EDIT + '/?userId=' + this.UserId)
                .subscribe({
                    next: (result: any) => {
                        this.UserList = result.users.userList;
                       
                        if (this.UserList != undefined && this.UserList.length > 0) {

                            this.filteredRoleList = _.filter(this.RoleList, m => {
                                return m.applicationId == this.UserList[0].applicationId;
                            });
                            let selectedunitIds: any = result.users.unitList.map((id: any) => id.unitId)

                            this.UserId = this.UserList[0].userId;
                            this.UserCreationForm.get("application")?.setValue(this.ApplicationList.find(app => app.applicationId === this.UserList[0].applicationId));
                            this.UserCreationForm.get("employee")?.setValue(this.EmployeesList.find(app => app.employeeId === this.UserList[0].employeeId));
                            this.UserCreationForm.get('userName')?.setValue(this.UserList[0].userName);
                            this.UserCreationForm.get('password')?.setValue(this.UserList[0].password);
                            this.UserCreationForm.get("role")?.setValue(this.filteredRoleList.find(app => app.roleId === this.UserList[0].roleId));

                            this.UserCreationForm.get("selectedUnits")?.setValue(this.UnitList.filter(o => selectedunitIds.includes(o.unitId)));
                            this.UserCreationForm.get('page')?.setValue(this.DefaultPagesList.find(app => app.pageId === this.UserList[0].pageId));

                            this.UserCreationForm.get('email')?.setValue(this.UserList[0].email);
                            this.UserCreationForm.get('phoneNumber')?.setValue(this.UserList[0].phoneNumber);

                            // this.UserCreationForm.get("application")?.disable();

                            
                        }
                    },
                    error: (err: HttpErrorResponse) => console.log('fnGetUserById() ', err)

                });

        } catch (error) {

        }
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

    public LoadDefaultPages(applicationId: any) {

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

        console.log(this.UserCreationForm.value);

        // {
        //     "userId": 0,
        //     "userName": "string",
        //     "employeeId": 0,
        //     "password": "string",
        //     "description": "string",
        //     "defaultPageId": 0,
        //     "applicationId": 0,
        //     "roleId": 0,
        //     "email": "string",
        //     "phoneNumber": "string",
        //     "unitId": 0,
        //     "isActive": true,
        //     "loggedinUserId": 0,
        //     "ipAddress": "string"
        //   }
        let _apiUrl: string = '';
        let passSaveParams: any = {};

        try {

            if (this.IsUpdate) {  //  UPDATE

                passSaveParams.userId = this.UserId;
                passSaveParams.userName = this.UserCreationForm.value['userName'];
                passSaveParams.employeeId = this.UserCreationForm.value['employee'] != undefined ? this.UserCreationForm.value['employee'].employeeId : 0;

                passSaveParams.password = this.UserCreationForm.value['password'];
                passSaveParams.description = '';
                passSaveParams.pageId = this.UserCreationForm.value['page'] != undefined ? this.UserCreationForm.value['page'].pageId : 0;

                passSaveParams.applicationId = this.UserCreationForm.value['application'] != undefined ? this.UserCreationForm.value['application'].applicationId : 0;
                passSaveParams.roleId = this.UserCreationForm.value['role'] != undefined ? this.UserCreationForm.value['role'].roleId : 0;
                passSaveParams.email = this.UserCreationForm.value['email'];
                passSaveParams.phoneNumber = this.UserCreationForm.value['phoneNumber'];
                passSaveParams.selectedUnits = this.UserCreationForm.value['selectedUnits'];

                passSaveParams.isActive = true;
                passSaveParams.loggedinUserId = this.userDetails ? this.userDetails.UserId : 0;
                passSaveParams.ipAddress = "192.168.1.1";

                _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.USER.UPDATE;

            } else {    //  SAVE

                passSaveParams.userId = 0;
                passSaveParams.userName = this.UserCreationForm.value['userName'];
                passSaveParams.employeeId = this.UserCreationForm.value['employee'] != undefined ? this.UserCreationForm.value['employee'].employeeId : 0;

                passSaveParams.password = this.UserCreationForm.value['password'];
                passSaveParams.description = '';
                passSaveParams.pageId = this.UserCreationForm.value['page'] != undefined ? this.UserCreationForm.value['page'].pageId : 0;

                passSaveParams.applicationId = this.UserCreationForm.value['application'] != undefined ? this.UserCreationForm.value['application'].applicationId : 0;
                passSaveParams.roleId = this.UserCreationForm.value['role'] != undefined ? this.UserCreationForm.value['role'].roleId : 0;
                passSaveParams.email = this.UserCreationForm.value['email'];
                passSaveParams.phoneNumber = this.UserCreationForm.value['phoneNumber'];
                passSaveParams.selectedUnits = this.UserCreationForm.value['selectedUnits'];

                passSaveParams.isActive = true;
                passSaveParams.loggedinUserId = this.userDetails ? this.userDetails.UserId : 0;
                passSaveParams.ipAddress = "192.168.1.1";

                _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.USER.SAVE;

            }
            console.log('Before Save/Update', JSON.stringify(passSaveParams));

            this.httpService.globalPost(_apiUrl,
                JSON.stringify(passSaveParams))
                .subscribe({
                    next: (result: any) => {
                        console.log('After Save/Update', result);

                        this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message);
                        this.Clear();
                    },
                    error: (err: HttpErrorResponse) => console.log(err)
                });

        } catch (error) {

        }
    }


    private notificationsService(_severity: any, _summary: any, _message: any) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
        return;
    }

    Clear() {
        this.buttonText = "Save";
        this.IsUpdate = false;
        this.UserCreationForm.reset();
    }

    RedirecttoList() {
        this.router.navigate(['/apps/admin/user-list']);
    }
}

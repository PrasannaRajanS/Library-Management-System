import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as yup from "yup";
import { YupFormControls, FormHandler } from '../../../shared/form-handler';
import { IPageCreation } from "../../services/interfaces/IPageCreation";
import { YupAdminValidation } from '../../services/validation-schemas/yup-page-creation';
import { UtilService } from "../../../shared/util.service";


import { IApplication } from './../../services/interfaces/IApplication';
import { IModule } from '../../services/interfaces/IModule';
import * as _ from 'lodash';
import { AdminAPIConfig } from '../../services/admin-api-config';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminValidation } from '../../services/admin-validation';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { IMainPage } from '../../services/interfaces/IMainPage';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-page-creation',
  templateUrl: './page-creation.component.html',
  styleUrls: ['./page-creation.component.scss']
})
export class PageCreationComponent {

  PageId: any = 0 ;
  PageCreationDialog: boolean = false;

  ApplicationList: IApplication[] = [];

  ModuleList: IModule[] = [];
  filteredModuleList: IModule[] = [];

  SubModuleList: any[] = [];

  MainPageList: IMainPage[] = [];
  filteredMainPageList: IMainPage[] = [];

  PageList: IPageCreation[] = [];

  buttonText: string = 'Save';
  private IsUpdate: boolean = false;
  public userDetails: any;

  LoadGrid: any[] = [];

  ingredient: string = '';

  // submitted: boolean = false;
  PageCreationInfoForm: FormGroup<YupFormControls<IPageCreation>>;  //  Step 1

  initialValues: IPageCreation = {   //  Step 2
    pageId: null,
    pageName: '',
    // uniqueName: null,

    pageURL: '',
    mainPageId: null,
    mainPageName: null,

    applicationId: null,
    application: null,
    moduleId: null,
    moduleName: null,
    // subModuleId: null,
    // subModuleName: null,

    orderBy: '',
    iconStyle: '',
    isMenu: null
  }

  validationSchema: yup.ObjectSchema<IPageCreation> = YupAdminValidation.PAGE_CREATION;  //  Step 3

  formError = (controlName: string, formName: any) => {
    return this.UtilService.formError(controlName, formName);
  };

  public isAgreement: boolean = false;
  public deleteProductDialog: boolean = false;

  public Locations: any[] = [];


  categories: any[] = [
    { name: 'Yes', key: 1 },
    { name: 'No', key: 0 },
  ];

  constructor(
    private UtilService: UtilService,
    private httpService: CommonHttpService,
    private messageService: MessageService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
  ) {

    this.PageCreationInfoForm = FormHandler.controls<IPageCreation>(this.initialValues);
    this.PageCreationInfoForm.setValidators(FormHandler.validate<IPageCreation>(this.validationSchema));


    //#region 
    this.activatedRoute.params.subscribe((params: any) => {


      if (params != undefined && !_.isEmpty(params)) {
        this.PageId = (+(params.id));
        this.buttonText = "Update";
        this.IsUpdate = true;

      } else {
        this.PageId = 0;
        this.IsUpdate = false;
      }
    });
    //#endregion


  }


  ngOnInit() {
    this.LoadApplication();
    this.LoadModuleList();
    this.LoadSubModuleList();
    this.LoadMainPageList();

    /** Update **/
    this.fnGetByPageId();
    /** Update **/
  }


  public fnGetByPageId() {

    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.PAGE_CREATION.EDIT + '/?pageId=' + this.PageId)
        .subscribe({
          next: (result: any) => {
            this.PageList = result.pages;
            console.log('fnGetByPageId', this.PageList);

            if (this.PageList != undefined && this.PageList.length > 0) {
              this.PageId = this.PageList[0].pageId;
              this.PageCreationInfoForm.get("application")?.setValue(this.ApplicationList.find(app => app.applicationId === this.PageList[0].applicationId));
              this.PageCreationInfoForm.get("moduleName")?.setValue(this.ModuleList.find(app => app.moduleId === this.PageList[0].moduleId));

              this.PageCreationInfoForm.get('pageName')?.setValue(this.PageList[0].pageName);
              this.PageCreationInfoForm.get('pageURL')?.setValue(this.PageList[0].pageURL);
              this.PageCreationInfoForm.get('mainPageName')?.setValue(this.MainPageList.find(app => app.mainPageId === this.PageList[0].mainPageId));
              this.PageCreationInfoForm.get('orderBy')?.setValue(this.PageList[0].orderBy);
              this.PageCreationInfoForm.get('iconStyle')?.setValue(this.PageList[0].iconStyle);
              this.PageCreationInfoForm.get('isMenu')?.setValue(this.categories.find(cat => Boolean(cat.key) == this.PageList[0].isMenu));
            }
          },
          error: (err: HttpErrorResponse) => console.log('fnGetById() ', err)
        });

    } catch (error) {

    }
  }

  public LoadApplication() {

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

  LoadModuleList() {
    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.MODULE.LIST)
        .subscribe({
          next: (result: any) => {
            this.ModuleList = result.modules;
            this.filteredModuleList = this.ModuleList;
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }

  LoadSubModuleList() {
    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.MODULE.LIST)
        .subscribe({
          next: (result: any) => {
            this.ModuleList = result.modules;
            this.filteredModuleList = this.ModuleList;
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }


  LoadMainPageList() {
    try {

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.PAGE_CREATION.MAIN_PAGE_LIST)
        .subscribe({
          next: (result: any) => {
            this.MainPageList = result.mainPages;
            this.filteredMainPageList = this.MainPageList;
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }

  filterMagePage(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.MainPageList as any[]).length; i++) {
      let mPages = (this.MainPageList as any[])[i];
      if (mPages.mainPageName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(mPages);
      }
    }

    this.filteredMainPageList = filtered;
  }



  onChangeApplicationName($event: any) {

    this.filteredModuleList = _.filter(this.ModuleList, m => {
      return m.applicationId == $event.value.applicationId;
    });

  }

  Save() {

    console.log(this.PageCreationInfoForm.value);

    try {
      let _apiUrl: string = '';


      let passSaveParams: any = {};

      if (this.IsUpdate) {  //  UPDATE

        passSaveParams.pageId = this.PageId;
        passSaveParams.pageName = this.PageCreationInfoForm.value['pageName'];
        passSaveParams.pageURL = this.PageCreationInfoForm.value['pageURL'];

        passSaveParams.linkId = this.PageCreationInfoForm.value['mainPageName'] != undefined ? this.PageCreationInfoForm.value['mainPageName'].mainPageId : 0;
        passSaveParams.applicationId = this.PageCreationInfoForm.value['application'] != undefined ? this.PageCreationInfoForm.value['application'].applicationId : 0;
        passSaveParams.moduleId = this.PageCreationInfoForm.value['moduleName'] != undefined ? this.PageCreationInfoForm.value['moduleName'].moduleId : 0;

        passSaveParams.orderID = this.PageCreationInfoForm.value['orderBy'];
        passSaveParams.iconStyle = this.PageCreationInfoForm.value['iconStyle'];
        passSaveParams.isMenu = Boolean(this.PageCreationInfoForm.value['isMenu'].key);
        
        passSaveParams.unitId = 0;
        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.PAGE_CREATION.UPDATE;

      }
      else {  //  SAVE


        passSaveParams.pageId = 0;
        passSaveParams.pageName = this.PageCreationInfoForm.value['pageName'];
        passSaveParams.pageURL = this.PageCreationInfoForm.value['pageURL'] !=undefined ? this.PageCreationInfoForm.value['pageURL'] : '';

        passSaveParams.linkId = this.PageCreationInfoForm.value['mainPageName'] != undefined ? this.PageCreationInfoForm.value['mainPageName'].mainPageId : 0;
        passSaveParams.applicationId = this.PageCreationInfoForm.value['application'] != undefined ? this.PageCreationInfoForm.value['application'].applicationId : 0;
        passSaveParams.moduleId = this.PageCreationInfoForm.value['moduleName'] != undefined ? this.PageCreationInfoForm.value['moduleName'].moduleId : 0;

        passSaveParams.orderID = this.PageCreationInfoForm.value['orderBy'];
        passSaveParams.iconStyle = this.PageCreationInfoForm.value['iconStyle'];
        passSaveParams.isMenu = this.PageCreationInfoForm.value['isMenu'] !=null ? Boolean(this.PageCreationInfoForm.value['isMenu'].key) : false;
        
        passSaveParams.unitId = 0;
        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.PAGE_CREATION.SAVE;
        
      }

      //  console.log("Save / Update Click", JSON.stringify(passSaveParams))

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

  RedirecttoList() {
    this.router.navigate(['/apps/admin/page-list']);
  }

  Clear() {
    this.buttonText = "Save";
    this.IsUpdate = false;
    this.PageCreationInfoForm.reset();
  }

  numberOnly(event: any) {
    this.UtilService.active2DecimalOnly(event)
  }

  OnlyCharacters(event: any) {
    this.UtilService.charactersOnly(event)
  }

  NumberCharacterOnly(event: any) {
    this.UtilService.CharacterNumberOnly(event)
  }

  openNew() {
    // this.submitted = false;
    this.PageCreationDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductDialog = true;
  }

  confirmDelete() {
    this.deleteProductDialog = false;
  }

  hideDialog() {
    this.PageCreationDialog = false;
    // this.submitted = false;
  }

  saveProduct() {
    // this.submitted = true;
    // if (_.isEmpty(this.PageCreationInfoForm)) {
    //   alert();
    // }
  }

  saveUsers() {
    // this.submitted = true;
  }

  onSubmitPageCreationInfo() {

  }

  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }
}

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as yup from "yup";
import { YupFormControls, FormHandler } from '../../../shared/form-handler';
import { IPageCreation } from "../../services/interfaces/IPageCreation";
import { YupAdminValidation } from '../../services/validation-schemas/yup-page-creation';
import { UtilService } from "../../../shared/util.service";
import { PageService } from '../../services/page.service';

import { IApplication } from '../../api/application';
import { IModule } from '../../services/interfaces/IModule';
import * as _ from 'lodash';
import { AdminAPIConfig } from '../../services/admin-api-config';
import { HttpService } from '../../services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminValidation } from '../../services/admin-validation';
import { MessageService } from 'primeng/api';

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

  PageCreationDialog: boolean = false;

  ApplicationList: IApplication[] = [];

  ModuleList: IModule[] = [];
  filteredModuleList: IModule[] = [];

  SubModuleList: any[] = [];

  buttonText: string = 'Save';
  private IsUpdate: boolean = false;
  public userDetails: any;

  LoadGrid: any[] = [];

  ingredient: string = '';

  submitted: boolean = false;
  PageCreationInfoForm: FormGroup<YupFormControls<IPageCreation>>;  //  Step 1

  initialValues: IPageCreation = {   //  Step 2
    ApplicationName: null,
    ModuleName: null,
    SubModuleName: null,
    PageName: '',
    PageURL: '',
    MainPageName: '',
    OrderBy: '',
    IconStyle: '',
    selectedCategory: false
  }

  validationSchema: yup.ObjectSchema<IPageCreation> = YupAdminValidation.PAGE_CREATION;  //  Step 3

  formError = (controlName: string, formName: any) => {
    return this.UtilService.formError(controlName, formName);
  };

  public isAgreement: boolean = false;
  public deleteProductDialog: boolean = false;

  public Locations: any[] = [];


  categories: any[] = [
    { name: 'Yes', key: '1' },
    { name: 'No', key: '0' },
  ];

  constructor(
    private UtilService: UtilService,
    private PageService: PageService,
    private httpService: HttpService,
    private messageService: MessageService
  ) {

    this.PageCreationInfoForm = FormHandler.controls<IPageCreation>(this.initialValues);
    this.PageCreationInfoForm.setValidators(FormHandler.validate<IPageCreation>(this.validationSchema));
    
  }

  ngOnInit() {
    this.LoadApplication();
    this.LoadModuleList();
    // this.LoadGridData();
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

  LoadGridData() {
    var params: any = {};
    this.PageService.LoadGridData(params).then((res: any[] | undefined) => {
      if (res != undefined) {
        this.LoadGrid = res;
      }
    });
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

           // passSaveParams.pageId = 0;
          // passSaveParams.pageName = this.Name;
          // passSaveParams.pageURL = this.SummaryDescription;
          // passSaveParams.linkId = 0;
          // passSaveParams.applicationId = 0;
          // passSaveParams.moduleId = 0;
          // passSaveParams.orderID = 0;
          // passSaveParams.isSubModule = false;
          // passSaveParams.unitId = 0;

          // passSaveParams.isActive = true;
          // passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
          // passSaveParams.ipAddress = "192.168.1.1";

          _apiUrl = AdminAPIConfig.API_CONFIG.API_URL.ADMIN.PAGE_CREATION.UPDATE;

        }
        else {  //  SAVE


          passSaveParams.pageId = 0;
          passSaveParams.pageName = this.PageCreationInfoForm.value['PageName'];
          passSaveParams.pageURL = this.PageCreationInfoForm.value['PageURL'];
          passSaveParams.linkId = this.PageCreationInfoForm.value['MainPageName'];
          passSaveParams.applicationId = this.PageCreationInfoForm.value['ApplicationName'].applicationId;
          passSaveParams.moduleId = this.PageCreationInfoForm.value['ModuleName'].moduleId;
          passSaveParams.orderID = this.PageCreationInfoForm.value['OrderBy'];
          // passSaveParams.isSubModule = this.PageCreationInfoForm.value['selectedCategory'].key;
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

              this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message);
              this.Clear();
            },
            error: (err: HttpErrorResponse) => console.log(err)
          });

      
    } catch (error) {

    }


    
  }

  RedirecttoList() {

  }

  Clear() {

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
    this.submitted = false;
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
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    // if (_.isEmpty(this.PageCreationInfoForm)) {
    //   alert();
    // }
  }

  saveUsers() {
    this.submitted = true;
  }

  onSubmitPageCreationInfo() {

  }

  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }
}

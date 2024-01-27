import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import * as _ from 'lodash';
import { IApplication } from './../../services/interfaces/IApplication';
import { AdminAPIConfig } from '../../services/admin-api-config';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpService } from '../../services/http.service';
import { UtilService } from "../../../shared/util.service";
import { MessageService } from 'primeng/api';
import { AdminValidation } from '../../services/admin-validation';

import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { FormGroup } from '@angular/forms';
import { IRolePageAssociate } from '../../services/interfaces/IRolePageAssociate';
import { YupAdminValidation } from '../../services/validation-schemas/yup-page-creation';
import * as yup from "yup";
import { IRole } from '../../services/interfaces/IRole';

@Component({
  selector: 'app-role-page-associate',
  templateUrl: './role-page-associate.component.html',
  styleUrls: ['./role-page-associate.component.scss']
})
export class RolePageAssociateComponent {
  public Pages: any[] = [];
  public SelectedPages: any = [];
  public DeleteSelectedPages: any[] = [];

  ApplicationList: IApplication[] = [];
  public selectApplication: IApplication | undefined = undefined;

  RoleList: IRole[] = [];
  public selectRole: any = null;
  filteredRoleList: IRole[] = [];

  private Validaction: boolean = true;
  private ValidactionMsg: string = '';


  //#region UI Validation Variables
  RolePageAssociateForm: FormGroup<YupFormControls<IRolePageAssociate>>;  //  Step 1

  initialValues: IRolePageAssociate = {   //  Step 2
    rolePageAssocId: 0,
    applicationId: 0,
    application: null,
    roleId: null,
    role: null,

    pageId: null,
    isActive: null,
    userId: null,
    ipAddress: null,
  }

  validationSchema: yup.ObjectSchema<IRolePageAssociate> = YupAdminValidation.ROLE_PAGE_ASSOCIATE;  //  Step 3

  formError = (controlName: string, formName: any) => {   //  Step 4
    return this.utilService.formError(controlName, formName);
  };
  //#endregion


  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private messageService: MessageService
  ) {
    this.RolePageAssociateForm = FormHandler.controls<IRolePageAssociate>(this.initialValues);
    this.RolePageAssociateForm.setValidators(FormHandler.validate<IRolePageAssociate>(this.validationSchema));
  }

  ngOnInit() {
    this.LoadApplication();
    this.LoadRole();
    // this.LoadPagesdtls();
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

  public LoadRole() {

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

  onChangeApplicationName($event: any) {
   
    this.filteredRoleList = _.filter(this.RoleList, m => {
      return m.applicationId == $event.value.applicationId;
    });

  }

  onChangeRole($event: any) {
    this.GetPagesByRole();
  }


  public GetPagesByRole() {

    this.SelectedPages = [];
    this.DeleteSelectedPages = [];
    
    try {

      let _roleId: number = this.RolePageAssociateForm.value['role'] != undefined ? this.RolePageAssociateForm.value['role'].roleId : 0;

      this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.ROLE_PAGE_ASSOCIATION.GET_ROLE_PAGES + '/?roleId=' + _roleId)
        .subscribe({
          next: (result: any) => {
            this.Pages = result.rolePages.moduleList;

            console.log(JSON.stringify(result.rolePages.moduleList));

            this.expandAll();
          },
          error: (err: HttpErrorResponse) => console.log('fnGetById() ', err)
        });

    } catch (error) {

    }

  }

  expandAll() {
    this.Pages.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    this.selectedCheckBox(node);
    if (node.children) {
      node.children.forEach(childNode => {
        //this.selectedCheckBox(childNode);
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  private selectedCheckBox(data: any) {
    try {
      if (data.IsChecked != undefined && data.IsChecked == true) {
        this.SelectedPages.push(data);
      }
    } catch (error) {
      // this.UtilsService.UserError(error);.
    }
  }


  /**
  * Save
  */
  public Save() {
    try {
      this.Validaction = true;
      this.ValidactionMsg = "";
      if (this.selectApplication == undefined || _.isEmpty(this.selectApplication)) {
        this.Validaction = false;
        this.ValidactionMsg = "Please select Application"
      }
      else if (this.selectRole == undefined || _.isEmpty(this.selectRole)) {
        this.Validaction = false;
        this.ValidactionMsg = "Please select Role"
      } else if (this.SelectedPages.length == 0 && this.DeleteSelectedPages.length == 0) {
        this.Validaction = false;
        this.ValidactionMsg = "Please select pages"
      }

      if (this.Validaction) {

        let Passparam: any = {};
        Passparam.RoleId = this.selectRole.RoleId;
        Passparam.Pages = [];
        _.each(this.SelectedPages, va => {
          let value: any = {};
          value.modelId = va.modelId;
          value.pageId = va.pageId;
          value.subModel = va.subModel;
          value.RolePageAssocId = va.RolePageAssocId;
          value.LinkId = va.LinkId;
          value.IsSubModule = va.IsSubModule;
          value.IsLinkPage = va.IsLinkPage;
          value.IsActive = 1;
          Passparam.Pages.push(value)
        });
        _.each(this.DeleteSelectedPages, va => {
          let value: any = {};
          value.modelId = va.modelId;
          value.pageId = va.pageId;
          value.subModel = va.subModel;
          value.RolePageAssocId = va.RolePageAssocId;
          value.LinkId = va.LinkId;
          value.IsSubModule = va.IsSubModule;
          value.IsLinkPage = va.IsLinkPage;
          value.IsActive = 0;
          Passparam.Pages.push(value)
        });
        console.log("Selected Pages =>", JSON.stringify(Passparam));

        // this.AdminService.SaveRollAssc(Passparam).then(res => {
        //     if (res) {
        //         if (res.Status) {
        //             this.UtilsService.Success(res.Message);
        //             this.Clear();
        //         } else {
        //             this.UtilsService.UserError(res.Message);
        //         }
        //     }
        // })

      } else {

        this.notificationsService(AdminValidation.NOTIFICATION_VALIDATION, 'Error Message', this.ValidactionMsg);
      }

    } catch (error) {

      this.notificationsService(AdminValidation.NOTIFICATION_ERROR, 'Error Message', error);
    }

  }

  /**
  * onChangeRoleAssociate
  */
  public onChangeRoleAssociate(event: boolean, data: any) {
    try {
      this.CheckData(event, data);
      if (data.children != null && data.children.length != 0) {
        _.each(data.children, va => {
          this.CheckData(event, va);
        })
      }
    } catch (error) {

    }
  }

  private CheckData(event: boolean, data: any) {
    try {
      data.IsChecked = event
      let find: any;
      if (event) {

        this.SelectedPages.push(data)
      } else {
        find = {};
        find = _.find(this.SelectedPages, { pageId: data.pageId });
        if (find != undefined && !_.isEmpty(find)) {
          let index = _.indexOf(this.SelectedPages, find);
          if (index != -1) {
            this.SelectedPages.splice(index, 1);
            this.SelectedPages = [...this.SelectedPages]

          }

        }
      }

      if (+(data.RolePageAssocId) != 0) {
        find = _.find(this.DeleteSelectedPages, { pageId: data.pageId, RolePageAssocId: data.RolePageAssocId });
        if (find != undefined && !_.isEmpty(find)) {
          let index = _.indexOf(this.DeleteSelectedPages, find);
          if (index != -1) {
            this.DeleteSelectedPages.splice(index, 1);
            this.DeleteSelectedPages = [...this.DeleteSelectedPages]

          }

        }
        if (!event) {
          this.DeleteSelectedPages.push(data)
        }

      }
      console.log(this.SelectedPages)
      console.log(this.DeleteSelectedPages)

    } catch (error) {

    }
  }

  nodeSelect(data: any) {
    try {

      _.each(this.SelectedPages, va => {
        this.DelecteRecords(va);
      })
      //  console.log("Selected files => ", this.SelectedPages, this.DeleteSelectedPages)

    } catch (error) {

    }
  }

  nodeUnselect(data: any) {
    // console.log(JSON.stringify({ severity: 'info', summary: 'Node Unselected', detail: event.node.label }));
    //  console.log("Unselected files => ", this.SelectedPages, this.DeleteSelectedPages)
    this.DeleteRecursive(data);
    if (data.parent != undefined) {
      this.DeleteParentRecursive(data.parent)
    }

  }

  private DeleteParentRecursive(node: any) {

    this.DeleteParentNode(node);
    if (node.parent != undefined) {
      this.DeleteParentRecursive(node.parent);
    }

  }

  private DeleteRecursive(node: any) {

    this.DelecteRecords(node);
    if (node.parent != undefined) {
      this.DeleteParentNode(node.parent);
    }
    if (+(node.RolePageAssocId) != 0) {
      this.DeleteSelectedPages.push(node)
    }
    if (node.children) {
      node.children.forEach((childNode: any) => {
        this.DeleteRecursive(childNode);
      });
    }
  }

  private DeleteParentNode(data: any) {
    try {

      let find = _.find(this.SelectedPages, { pageId: data.pageId, RolePageAssocId: data.RolePageAssocId });
      if (find != undefined && !_.isEmpty(find)) {

      } else {
        this.DelecteRecords(data);
        if (+(data.RolePageAssocId) != 0) {
          this.DeleteSelectedPages.push(data)
        }
      }




    } catch (error) {

    }
  }

  private DelecteRecords(data: any) {
    try {
      // if (+(data.RolePageAssocId) != 0) {
      let find = _.find(this.DeleteSelectedPages, { pageId: data.pageId, RolePageAssocId: data.RolePageAssocId });
      if (find != undefined && !_.isEmpty(find)) {
        let index = _.indexOf(this.DeleteSelectedPages, find);
        if (index != -1) {
          this.DeleteSelectedPages.splice(index, 1);
          this.DeleteSelectedPages = [...this.DeleteSelectedPages]

        }

      }


      // }
    } catch (error) {

    }
  }

  Clear() {

  }

  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }

}

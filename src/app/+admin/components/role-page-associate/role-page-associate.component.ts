import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from 'src/app/demo/service/node.service';
import * as _ from 'lodash';
import { IApplication } from '../../api/application';
import { AdminAPIConfig } from '../../services/admin-api-config';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpService } from '../../services/http.service';
import { UtilService } from "../../../shared/util.service";
import { MessageService } from 'primeng/api';
import { AdminValidation } from '../../services/admin-validation';
@Component({
  selector: 'app-role-page-associate',
  templateUrl: './role-page-associate.component.html',
  styleUrls: ['./role-page-associate.component.scss']
})
export class RolePageAssociateComponent {
  public Pages: any[] = [];
  public SelectedPages: any= [];
  public DeleteSelectedPages: any[] = [];

  public selectApplication :IApplication | undefined = undefined;
  public selectRole :any =null;

  ApplicationList: IApplication[] = [];
  RoleList : any =[];
      private Validaction: boolean = true;
    private ValidactionMsg: string = '';
  constructor(  private UtilService: UtilService,

    private httpService: HttpService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.LoadPagesdtls();
    this.LoadApplication();
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
  

  onChangeApplicationName($event: any) {

 this.selectRole ={};
 this.RoleList = [];


  }
  onChangeRole($event: any) {

 this.LoadPagesdtls();

  }
  private LoadPagesdtls() {

    this.SelectedPages = [];
    this.DeleteSelectedPages = [];

    try {
        // this.AdminService.GetPagesDetails({ RoleId: this.SelectedRole.RoleId == undefined ? 0 : this.SelectedRole.RoleId }).then(res => {

        //     console.log("Response => ", JSON.stringify(res))

        //     if (res) {
        //         if (res.Status) {
        //             this.Pages = res.ModuleList;
        //             this.expandAll();
        //         }
        //     }

        // });
let res ={
  "ModuleList": [
    {
      "modelId": 1,
      "label": "Master Creation",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 1,
      "ModuleName": "Master Creation",
      "Description": "This is Admin Module",
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 1,
      "RolePageAssocId": 5257,
      "children": [
        {
          "label": "User Creation",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 1,
          "pageId": 4,
          "RolePageAssocId": 82,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 1,
          "OrderID": 4,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "User Right Creation",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 1,
          "pageId": 6,
          "RolePageAssocId": 83,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 1,
          "OrderID": 6,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Misc",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 1,
          "pageId": 14,
          "RolePageAssocId": 91,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 1,
          "OrderID": 14,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Misc Detail",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 1,
          "pageId": 15,
          "RolePageAssocId": 92,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 1,
          "OrderID": 15,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Particular",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 1,
          "pageId": 16,
          "RolePageAssocId": 93,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 1,
          "OrderID": 16,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Supplier / Customer",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 1,
          "pageId": 17,
          "RolePageAssocId": 94,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 1,
          "OrderID": 17,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Item",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 1,
          "pageId": 42,
          "RolePageAssocId": 171,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 1,
          "OrderID": 17,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Rate",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 1,
          "pageId": 1048,
          "RolePageAssocId": 257,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 1,
          "OrderID": 18,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    },
    {
      "modelId": 2,
      "label": "PMS",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 2,
      "ModuleName": "PMS",
      "Description": "This is People Management System",
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 7,
      "RolePageAssocId": 84,
      "children": [
        {
          "label": "Misc",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 2,
          "pageId": 8,
          "RolePageAssocId": 85,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 7,
          "OrderID": 8,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Misc Detail",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 2,
          "pageId": 9,
          "RolePageAssocId": 86,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 7,
          "OrderID": 9,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Employee",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 2,
          "pageId": 10,
          "RolePageAssocId": 87,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 7,
          "OrderID": 10,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    },
    {
      "modelId": 4,
      "label": "Purchase Dept",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 4,
      "ModuleName": "Purchase Dept",
      "Description": null,
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 2049,
      "RolePageAssocId": 5258,
      "children": [
        {
          "label": "Accessories",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 18,
          "RolePageAssocId": 95,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 26,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Purchase Entry",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 20,
          "RolePageAssocId": 97,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 20,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Purchase List",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 21,
          "RolePageAssocId": 98,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 21,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Purchase",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 27,
          "RolePageAssocId": 104,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 27,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Reel Stock ",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 31,
          "RolePageAssocId": 108,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 31,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Reel Usage",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 32,
          "RolePageAssocId": 109,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 32,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Reel Summary",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 33,
          "RolePageAssocId": 110,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 33,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Accessary Summary",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 40,
          "RolePageAssocId": 117,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 40,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Accessary Item Wise",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 4,
          "pageId": 41,
          "RolePageAssocId": 118,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2049,
          "OrderID": 41,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    },
    {
      "modelId": 5,
      "label": "Coating Dept",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 5,
      "ModuleName": "Coating Dept",
      "Description": null,
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 2050,
      "RolePageAssocId": 5259,
      "children": [
        {
          "label": "PRD Production Stmt",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 5,
          "pageId": 28,
          "RolePageAssocId": 105,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2050,
          "OrderID": 28,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Production Summary",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 5,
          "pageId": 30,
          "RolePageAssocId": 107,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2050,
          "OrderID": 30,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Wastage",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 5,
          "pageId": 38,
          "RolePageAssocId": 115,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2050,
          "OrderID": 38,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Coating Entry",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 5,
          "pageId": 43,
          "RolePageAssocId": 173,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2050,
          "OrderID": 23,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Coating List",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 5,
          "pageId": 44,
          "RolePageAssocId": 174,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2050,
          "OrderID": 23,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    },
    {
      "modelId": 6,
      "label": "Slitting Dept",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 6,
      "ModuleName": "Slitting Dept",
      "Description": null,
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 2051,
      "RolePageAssocId": 5260,
      "children": [
        {
          "label": "Slitting Entry",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 6,
          "pageId": 45,
          "RolePageAssocId": 175,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2051,
          "OrderID": 23,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Slitting List",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 6,
          "pageId": 46,
          "RolePageAssocId": 176,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2051,
          "OrderID": 23,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Slitting Date Wise",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 6,
          "pageId": 47,
          "RolePageAssocId": 177,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2051,
          "OrderID": 30,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    },
    {
      "modelId": 7,
      "label": "Delivery Dept",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 7,
      "ModuleName": "Delivery Dept",
      "Description": null,
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 2052,
      "RolePageAssocId": 5261,
      "children": [
        {
          "label": "DC Entry",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 7,
          "pageId": 24,
          "RolePageAssocId": 101,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2052,
          "OrderID": 24,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "DC List",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 7,
          "pageId": 25,
          "RolePageAssocId": 102,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2052,
          "OrderID": 25,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Finished Good",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 7,
          "pageId": 34,
          "RolePageAssocId": 111,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2052,
          "OrderID": 34,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "F.G Summary",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 7,
          "pageId": 35,
          "RolePageAssocId": 112,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2052,
          "OrderID": 35,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Delivery Challan",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 7,
          "pageId": 39,
          "RolePageAssocId": 116,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2052,
          "OrderID": 39,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    },
    {
      "modelId": 8,
      "label": "Accounts Dept",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 8,
      "ModuleName": "Accounts Dept",
      "Description": null,
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 2053,
      "RolePageAssocId": 5262,
      "children": [
        {
          "label": "Sales Normal",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 8,
          "pageId": 36,
          "RolePageAssocId": 113,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2053,
          "OrderID": 36,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Sales Detail",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 8,
          "pageId": 37,
          "RolePageAssocId": 114,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2053,
          "OrderID": 37,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Sale Entry",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 8,
          "pageId": 48,
          "RolePageAssocId": 249,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2053,
          "OrderID": 25,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Sale List",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 8,
          "pageId": 49,
          "RolePageAssocId": 250,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2053,
          "OrderID": 25,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Invoice",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 8,
          "pageId": 1049,
          "RolePageAssocId": 1256,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2053,
          "OrderID": 42,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    },
    {
      "modelId": 9,
      "label": "Dashboards",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 9,
      "ModuleName": "Dashboards",
      "Description": null,
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 2054,
      "RolePageAssocId": 5263,
      "children": [
        {
          "label": "Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 12,
          "RolePageAssocId": 89,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 12,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Purchase Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 3049,
          "RolePageAssocId": 5264,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 1,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Coating Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 3050,
          "RolePageAssocId": 5265,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 1,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Slitting Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 3051,
          "RolePageAssocId": 5266,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 1,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Sales Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 3052,
          "RolePageAssocId": 5267,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 1,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    },
    {
      "modelId": 9,
      "label": "Dashboards",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "subModel": "0",
      "ModuleId": 9,
      "ModuleName": "Dashboards",
      "Description": null,
      "Bactive": 0,
      "IsChecked": true,
      "pageId": 2054,
      "RolePageAssocId": 5268,
      "children": [
        {
          "label": "Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 12,
          "RolePageAssocId": 89,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 12,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Purchase Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 3049,
          "RolePageAssocId": 5264,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 1,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Coating Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 3050,
          "RolePageAssocId": 5265,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 1,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Slitting Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 3051,
          "RolePageAssocId": 5266,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 1,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        },
        {
          "label": "Sales Dashboard",
          "data": null,
          "expandedIcon": "fa fa-folder-open",
          "collapsedIcon": "fa fa-folder",
          "modelId": 9,
          "pageId": 3052,
          "RolePageAssocId": 5267,
          "ConditionId": 1,
          "subModel": 0,
          "LinkId": 2054,
          "OrderID": 1,
          "IsSubModule": 1,
          "IsLinkPage": 0,
          "Fontstyle": "md md-launch",
          "iconName": null,
          "Status": true,
          "PageURL": null,
          "IsChecked": true,
          "children": [
            
          ]
        }
      ]
    }
  ],
  "PageLis": null,
  "Status": true,
  "Message": "Success"
}
        this.Pages = res.ModuleList
        this.expandAll();

    } catch (error) {
        // this.UtilsService.UserError(error);
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
    else  if (this.selectRole == undefined || _.isEmpty(this.selectRole)) {
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

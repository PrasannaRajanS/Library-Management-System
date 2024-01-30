import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { HttpService } from 'src/app/+admin/services/http.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { IOrganization } from 'src/app/+fiscal/services/interfaces/IOrganization';

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent {


    //#region List Variables

    cols: any[] = [];
    item:IOrganization={};
    items: IOrganization[] = [];
    selectedItems: IOrganization[] = [];


    
  // for Delete
    deleteDialog:boolean=false;


  public userDetails: any;

    constructor(
        private router: Router,
        private httpService:HttpService,
        private productService:ProductService,
        private messageService:MessageService
        ) {}


    ngOnInit() {
        this.GetAll();
    }

    public GetAll(){
            this.productService.getOrganization().then((data=>{
                this.items = data;
            }))
    }

  
    AddPage() {
        this.router.navigate(['/apps/fiscal/organization']);
    }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
      }
    


    Edit(item:any){
        console.log('Edit', item.organizationId);
        this.router.navigate(['/apps/fiscal/organization/' , item.organizationId ] );
        
    }



    Delete(data:any){
        this.deleteDialog = true;
          this.item = {...data}
        }



    confirmDelete(){
        this.deleteDialog=false;
        // doubt
        let deletedItem:any[]=this.items.filter( (val)=>val.organizationId === this.item.organizationId);

        console.log('deletedItem',deletedItem);
        
        if(deletedItem !=null && deletedItem.length > 0){
            var passSaveParams:any = {};
    
            passSaveParams.organizationId = deletedItem[0].organizationId;
            passSaveParams.isActive = false;
            passSaveParams.userId = this.userDetails? this.userDetails.userId: 0;
            passSaveParams.ipAddress = '192.168.1.1';
            
            // passSaveParams.name=deletedItem[0].name;
            // passSaveParams.shortName=deletedItem[0].shortName;
            // passSaveParams.addressOne=deletedItem[0].addressOne;
            // passSaveParams.addressTwo=deletedItem[0].addressTwo;
            // passSaveParams.addressThree=deletedItem[0].addressThree;
            // passSaveParams.addressFour=deletedItem[0].addressFour;
            // passSaveParams.city=deletedItem[0].city;
            // passSaveParams.state=deletedItem[0].state;
            // passSaveParams.country=deletedItem[0].country;
            // passSaveParams.pinCode=deletedItem[0].pinCode;
            // passSaveParams.phoneNumber=deletedItem[0].phoneNumber;
            // passSaveParams.fax=deletedItem[0].fax;
            // passSaveParams.mobileNumber=deletedItem[0].mobileNumber;
            // passSaveParams.email=deletedItem[0].email;
            // passSaveParams.website=deletedItem[0].website;
    
    
            this.httpService.globalPost(
              FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ORGANIZATION.DELETE,
              JSON.stringify(passSaveParams)
            )
            .subscribe({
              next: (result:any) =>{
                // this.Clear();
                this.notificationsService(
                  FiscalValidation.NOTIFICATION_SUCCESS,'success Message',result.message
                )
              },
              error:(err: HttpErrorResponse) => console.log(err),
              
            })
        }
        this.item={}
      }


      private notificationsService(_severity: any, _summary: any, _message: any) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
        return;
      }

}



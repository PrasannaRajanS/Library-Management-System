import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';

import { IMisc } from 'src/app/shared/interface/IMisc';
import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import * as yup from "yup";
import { AdminValidation } from 'src/app/+admin/services/admin-validation';


import { HttpService } from 'src/app/+admin/services/http.service';
import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';



import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';

@Component({
    selector: 'app-misc',
    templateUrl: './misc.component.html',
    styleUrls: ['./misc.component.scss'],
})
export class MiscComponent {

  


    // save
   public buttonText: string = 'Save';

    // Update
    private IsUpdate:boolean=false;
    // Once you get   keyword check is this need or not ?
    public PMSMiscId:string|null|undefined;
    public unitDetails:any;
    public userDetails:any;
    public IPAddress:string ="192.168.1.1"



    // Grid
    public miscId: number | null | undefined = 0;
    item: IMisc = {};
    items: IMisc[] = [];
    cols: any[] = [];
    selectedItems: IMisc[] = [];
    deleteDialog: boolean = false;





    // step 1  field values
    PMSMiscForm: FormGroup<YupFormControls<IMisc>>;

    // step 2 field  initialValues 

    initialValues: IMisc = {
      // why here zero instead of null
        miscId: 0,
        name: null,
        description: null,
        selectedMiscName:null,
        keyWord:null,
        isActive:null,
        unitId:null,
        userId:null,
        ipAddress:null
    };

    // step 4
    validationSchema:yup.ObjectSchema<IMisc>=YupFiscalValidation.MISC; 

    formError=(controlName:string,formName:any)=>{
      return  this.utilService.formError(controlName,formName)
    }

    constructor(
      // for vaildation
      private utilService:UtilService,
      private httpService:HttpService,
      private messageService : MessageService
    ) {
      // step 3
      // For Field:
        this.PMSMiscForm = FormHandler.controls<IMisc>(this.initialValues);
      // For Validation:
        this.PMSMiscForm.setValidators(FormHandler.validate<IMisc>(this.validationSchema))
    }

    // step 6

    Clear() {
      this.buttonText="Save";
      this.PMSMiscForm.reset();
      this.IsUpdate=false;
      this.GetAll();
      
    }


    // step 7

    Save() {

      try {
        let _apiUrl:string="";
        let passSaveParams:any={};
        
        if (this.IsUpdate) { 
          // Update
          
          passSaveParams.PMSMiscId=this.PMSMiscId;
          passSaveParams.PMSMiscName=this.PMSMiscForm.value['name'] !=null ? this.PMSMiscForm.value['name'] : ''  ;
          passSaveParams.PMSMiscDescription = this.PMSMiscForm.value['description'] !=null?this.PMSMiscForm.value['description']:'' ;

          passSaveParams.keyWord="";
          passSaveParams.isActive=true;
          passSaveParams.unitId = this.unitDetails ? this.unitDetails.unitId:0;
          passSaveParams.userId = this.userDetails ? this.userDetails.userId:0;
          passSaveParams.ipAddress = this.IPAddress;

          // Check MISC API

          _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.UPDATE;


        } else {
          passSaveParams.PMSMiscId=this.PMSMiscId;
          passSaveParams.PMSMiscName=this.PMSMiscForm.value['name'] !=null?this.PMSMiscForm.value['name']:"";
          passSaveParams.PMSMiscDescription=this.PMSMiscForm.value['description'] !=null? this.PMSMiscForm.value['description']:"";

          passSaveParams.keyWord=""
          passSaveParams.isActive=true;
          passSaveParams.unitId=this.unitDetails ? this.unitDetails.unitId:0;
          passSaveParams.userId = this.userDetails ? this.userDetails.userId:0;
          passSaveParams.ipAddress = this.IPAddress;

          // Check MISC API
          _apiUrl=FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.SAVE;

          
          
        }
        console.log("Check Befor Save " , passSaveParams);

        this.httpService.globalPost(_apiUrl,JSON.stringify(passSaveParams))
        .subscribe(
          {
            next:(result:any)=>{
              
              this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS, 'Success Message', result.message);
              this.Clear();
            },
            error:(err: HttpErrorResponse)=>console.log(err)
            
          }
        )
        
      }

       
      catch (error) {
        
      }
    }

    // step 8

    private notificationsService(_severity:any,_summary:any,_message:any){
      this.messageService.add({severity:_severity, summary:_summary,detail:_message , life:3000})
      return
      }

       // step 9 Grid

       public GetAll() {
        try {
            this.httpService
                .globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.LIST+'?keyWord=Fiscal')
                .subscribe({
                    next: (result: any) => {
                        this.items = result.miscs;
                        console.log('GetAll', this.items);
                    },
                    error: (err: HttpErrorResponse) => console.log(err),
                });
        } catch (error) {}
    }
    
    // step 10

    ngOnInit(){
      this.GetAll();
    }

    // Grid step 11

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal(  (event.target as HTMLInputElement).value, 'contains');
  }


    // step 12

    Edit(item: any){
      console.log('Edit',item);
      this.miscId=item.miscId;
      this.PMSMiscForm.controls['name']?.setValue(item.name);
      this.PMSMiscForm.controls['description']?.setValue(item.description);
      this.IsUpdate = true;
      this.buttonText="Update";
  }

  // step 13

  Delete(data: any){
    this.deleteDialog = true;
    this.item={...data};
  }
        
  // step 14

  confirmDelete(){
    this.deleteDialog=false;

    let deletedItem:any[]=this.items.filter((val)=> val.miscId === this.item.miscId);
    console.log('deletedItem',deletedItem);

    if(deletedItem !=null && deletedItem.length > 0){
        var passSaveParams:any={};

        passSaveParams.miscId = deletedItem[0].miscId;
        passSaveParams.name= deletedItem[0].name;
        passSaveParams.description = deletedItem[0].description;
        passSaveParams.isActive = false;
        passSaveParams.ipAddress=this.IPAddress;
        passSaveParams.keyWord="";
        console.log(passSaveParams);

        this.httpService.globalPost(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.DELETE 
          , JSON.stringify(passSaveParams))
        .subscribe(
          {
            next: (result:any) =>{
              this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS,'Success Message',result.message);
              this.Clear();
            },
            error:(err:HttpErrorResponse) => console.log(err),
            
          }
        )
        
    }
    
    this.item={};

  }



}

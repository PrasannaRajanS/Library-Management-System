import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IMisc } from 'src/app/shared/interface/IMisc';

import { AdminValidation } from 'src/app/+admin/services/admin-validation';
import { PMSAPIConfig } from 'src/app/+pms/services/pms-api-config';

import { HttpService } from 'src/app/+admin/services/http.service';
import { UtilService } from 'src/app/shared/util.service';
import { MessageService } from 'primeng/api';

import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { HttpErrorResponse } from '@angular/common/http';
import * as yup from "yup";
import { Table } from 'primeng/table';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';

@Component({
    selector: 'app-misc',
    templateUrl: './misc.component.html',
    styleUrls: ['./misc.component.scss'],
})
export class MiscComponent {

  


    // save
    buttonText: string = 'Save';

    // Update
    private IsUpdate:boolean=false;
    public PMSMiscId:string|null|undefined;
    public unitDetails:any;
    public userDetails:any;


    // Grid
    public miscId: number | null | undefined = 0;
    item: IMisc = {};
    items: IMisc[] = [];
    cols: any[] = [];
    selectedItems: IMisc[] = [];
    deleteDialog: boolean = false;



    //  field values
    PMSMiscForm: FormGroup<YupFormControls<IMisc>>;

    validationSchema:yup.ObjectSchema<IMisc>=YupFiscalValidation.MISC;
    
    

    // field  initialValues 

    initialValues: IMisc = {
      // why here zero instead of null
      miscId: 0,
        name: null,
        description: null,
        // selectedMiscName:null,
        isActive:null,
        unitId:null,
        userId:null,
        ipAddress:null
    };

    

    constructor(
      // for vaildation
      private utilService:UtilService,
      private httpService:HttpService,
      private messageService : MessageService
    ) {
      // For Field:
        this.PMSMiscForm = FormHandler.controls<IMisc>(this.initialValues);
      // For Validation:
        this.PMSMiscForm.setValidators(FormHandler.validate<IMisc>(this.validationSchema))
    }

    ngOnInit(){
      this.GetAll();
    }


    formError=(controlName:string,formName:any)=>{
      return  this.utilService.formError(controlName,formName)
    }

    Clear() {
      this.buttonText="Save";
      this.PMSMiscForm.reset();
    }
    
 

    Save() {

      try {
        let _apiUrl:string="";
        let passSaveParams:any={};
        
        if (this.IsUpdate) {
          console.log ( 'value of the update',this.IsUpdate);
          
          passSaveParams.PMSMiscId=this.PMSMiscId;
          passSaveParams.PMSMiscName=this.PMSMiscForm.value['name'];
          passSaveParams.PMSMiscDescription = this.PMSMiscForm.value['description'];


          passSaveParams.isActive=true;
          passSaveParams.unitId = this.unitDetails ? this.unitDetails.unitId:0;
          passSaveParams.userId = this.userDetails ? this.userDetails.userId:0;
          passSaveParams.ipAddress = '192.168.1.1';

          // Check MISC API

          _apiUrl = PMSAPIConfig.API_CONFIG.API_URL.PMS.MISC.UPDATE;


        } else {
          passSaveParams.PMSMiscId=this.PMSMiscId;
          passSaveParams.PMSMiscName=this.PMSMiscForm.value['name'];
          passSaveParams.PMSMiscDescription=this.PMSMiscForm.value['description'];

          passSaveParams.isActive=true;
          passSaveParams.unitId=this.unitDetails ? this.unitDetails.unitId:0;
          passSaveParams.userId = this.userDetails ? this.userDetails.userId:0;
          passSaveParams.ipAddress = '192.168.1.1';

          // Check MISC API
          _apiUrl=PMSAPIConfig.API_CONFIG.API_URL.PMS.MISC.SAVE;

          
          
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

    
   private notificationsService(_severity:any,_summary:any,_message:any){
    this.messageService.add({severity:_severity, summary:_summary,detail:_message , life:3000})
    return
    }


    // Grid

    public GetAll() {
      try {
          this.httpService
              .globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.LIST+'?keyWord=Fiscal')
              .subscribe({
                  next: (result: any) => {
                      this.items = result.miscs;
                      // console.log('GetAll', this.items);
                  },
                  error: (err: HttpErrorResponse) => console.log(err),
              });
      } catch (error) {}
  }
    
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal(  (event.target as HTMLInputElement).value, 'contains');
  }


  // Grid

  Edit(item: any){
      console.log('Edit',item);
      this.miscId=item.miscId;
      this.PMSMiscForm.controls['name']?.setValue(item.name);
      this.PMSMiscForm.controls['description']?.setValue(item.description);
      this.IsUpdate = true;
      this.buttonText="Update";
  }

  Delete(data: any){
    this.deleteDialog = true;
    this.item={...data};
  }

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

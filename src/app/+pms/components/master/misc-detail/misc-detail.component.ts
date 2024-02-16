import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Table } from 'primeng/table';

import { CustomerService } from 'src/app/demo/service/customer.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

import { PMSValidation } from 'src/app/+pms/services/pms-validation';
import { IMisc, IMiscDetails } from 'src/app/shared/interface/IMisc';
import { HttpService } from 'src/app/+fiscal/services/http.service';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { HttpErrorResponse } from '@angular/common/http';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';


@Component({
  selector: 'app-misc-detail',
  templateUrl: './misc-detail.component.html',
  styleUrls: ['./misc-detail.component.scss']
})
export class MiscDetailComponent {

  // Save
  public buttonText: string = 'Save';
  public IsUpdate: boolean = false;
  public miscId: number | undefined | null = 0;
  public userDetails: any;

  private isValidation: boolean = true;
  private ValidationMsg: string = "";
 


  //  List of items array
  selectedMiscName: IMisc = {};
  filteredMiscList:IMiscDetails[]=[]
  MiscList:IMisc[]=[]
 

// for list
cols:any[]=[]
// Grid 
items:IMiscDetails[]=[];
item: IMiscDetails = {};
// For Grid Agaisnt Load data
filteredItems:IMiscDetails[]=[];
selectedItems:IMiscDetails[]=[];



  PMSMiscDetailForm:FormGroup<YupFormControls<IMiscDetails>>;
  formError = (controlName:string,formName:any)=>{
    return this.utilService.formError(controlName,formName)
  }


initialValues: IMiscDetails ={
  miscDtlId: null,
    miscId: null,
    miscDtlName: null,
    selectedMiscName: null,
    miscDtlDesc: null,

    userId: null,
    unitId: null,
    isActive: null,
    ipAddress: null
}



constructor(
  private router:Router,
  private utilService:UtilService,
  private messageService:MessageService,
  private httpService:HttpService,
  private customerService:CustomerService,
   
){

  this.PMSMiscDetailForm = FormHandler.controls<IMiscDetails>(this.initialValues);
}

// step 1

public GetAll() {
  try {
      this.httpService
          .globalGet(   FiscalAPIConfig.API_CONFIG.API_URL.MASTER.MISC.DETAILS + '?keyWord=Fiscal')
          .subscribe({
              next: (result: any) => {
                  this.items = result.miscDtls;
                  this.filteredItems=this.items;
                     console.log('GetAll', this.items);
              },
              error: (err: HttpErrorResponse) => console.log(err),
          });
  } catch (error) {}
}
ngOnInit(){
  this.GetAll(); 
}

// step 2

filterMisc(event: AutoCompleteCompleteEvent) {
  let filtered: any[] = [];
  let query = event.query;
  for (let i = 0; i < (this.items as any[]).length; i++) {
      let misc = (this.items as any[])[i];

      if (misc.miscName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(misc);
      }
  }

  this.filteredMiscList = filtered;
}




// step 3 
Clear(){
  this.PMSMiscDetailForm.reset();
  this.GetAll();

}

// step 4
onGlobalFilter( table:Table , event:Event){ table.filterGlobal((event.target as HTMLInputElement).value , 'contains'); }


// step 5

onSelectMiscName(){
  console.log(this.PMSMiscDetailForm.controls['selectedMiscName']);

  if(this.PMSMiscDetailForm.controls['selectedMiscName'] !=null){
    this.filteredItems = _.filter(this.items , (val)=>{
      return (val.miscId==this.PMSMiscDetailForm.controls['selectedMiscName']?.value.miscId)
    })
  }
  
}


// step 6

public AddRows(){
  console.log("this.selectedMiscName",this.PMSMiscDetailForm.value['selectedMiscName']);
  
  if(this.PMSMiscDetailForm.value['selectedMiscName'] != null){

    try {
      let _miscDtlName: any[] = [];
      _miscDtlName = _.filter(this.filteredItems, va =>{
        return va.miscDtlDesc == "";
      })

      this.isValidation = true;
      this.ValidationMsg="";

      // if(this.PMSMiscDetailForm.value['selectedMiscName'] == undefined ||
      //  _.isEmpty(this.PMSMiscDetailForm.value['selectedMiscName'].miscName) ||
      //  this.PMSMiscDetailForm.value['selectedMiscName']==null
      //  ){
      //   this.isValidation =false;
      //   this.ValidationMsg = "Please Select Type"
      // }
      // else
       if(_miscDtlName.length !=0){
        this.isValidation=false;
        this.ValidationMsg="Please Enter Description";
      }

      if(this.isValidation){
        let dataBind:any={};
        dataBind.miscDtlId=0;
        dataBind.miscId = this.PMSMiscDetailForm.value['selectedMiscName'] !=null ? this.PMSMiscDetailForm.value['selectedMiscName'].miscId:0;
        dataBind.miscDtlName="";
        dataBind.miscDtlDesc="";

        dataBind.edit=true;
        dataBind.IsActive=true;
        this.filteredItems.push(dataBind);
      }
      else{
        this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION,'Validation Message',this.ValidationMsg)
      }

      
    } catch (error) {
      alert(error)
    }
  }
  else{
    this.notificationsService(PMSValidation.NOTIFICATION_VALIDATION,'Validation Message',"Please select Misc Name")
  }
}

  Save(){
    console.log('drop down values', this.filteredItems);
  }




  RemoveRows(data:any, index:number ){
  }

 private notificationsService(_severity:any,_summary:any,_message:any){
    this.messageService.add({severity:_severity, summary:_summary, detail:_message , life:3000});
    return;
 }




}

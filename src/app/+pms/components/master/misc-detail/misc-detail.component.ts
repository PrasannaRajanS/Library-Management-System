import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Table } from 'primeng/table';

import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';

import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PMSValidation } from 'src/app/+pms/services/pms-validation';
import { IMisc, IMiscDetails } from 'src/app/shared/interface/IMisc';


@Component({
  selector: 'app-misc-detail',
  templateUrl: './misc-detail.component.html',
  styleUrls: ['./misc-detail.component.scss']
})
export class MiscDetailComponent {

  // Save

  buttonText:string="Save";

  private isValidation: boolean = true;
  private ValidationMsg: string = "";

  //  List of items array
  filteredMiscList:IMisc[]=[]

  PMSMiscDetailForm:FormGroup<YupFormControls<IMiscDetails>>;


initialValues: IMiscDetails ={
  miscDtlId: null,
    miscId: null,
    miscName: null,
    selectedMiscName: null,
    MiscDtlDescription: null,

    userId: null,
    unitId: null,
    isActive: null,
    ipAddress: null
}

// for list

cols:any[]=[]
miscdetails:IMiscDetails[]=[];



selectedItems:IMiscDetails[]=[];
selectedMiscName:IMisc={};
MiscList:IMisc[]=[]
  
constructor(
  private router:Router,
  private utilService:UtilService,
  private messageService:MessageService
   
){

  this.PMSMiscDetailForm = FormHandler.controls<IMiscDetails>(this.initialValues);

  this.MiscList = [
    {
      "miscId": 1,
      "name": "பெயர்",
      "description": "அவன் பெயர் ஜான்"
    },
    {
      "miscId": 2,
      "name": "வயது",
      "description": "வயது வெறும் எண்"
    },
    {
      "miscId": 3,
      "name": "முகவரி",
      "description": "யாதும் ஊரே யாவரும் கேளிர்"
    },


  ];
}




  Save(){

    console.log('drop down values', this.MiscList);
    
  }

  Clear(){
    this.PMSMiscDetailForm.reset();
    this.miscdetails=[];

  }

  filterMisc(event: AutoCompleteCompleteEvent){
    let filtered:any[]=[];
    let query = event.query;

    for( let  i=0; i<(this.MiscList as any[]).length;i++){
      let misc =(this.MiscList as any[])[i];
      if(misc.name.toLowerCase().indexOf(query.toUpperCase())==0){
        filtered.push(misc);
      }
    }
this.filteredMiscList=filtered

  }

  formError = (controlName:string,formName:any)=>{
    return this.utilService.formError(controlName,formName)
  }



  onGlobalFilter( table:Table , event:Event){

  }

  AddRows(){
    console.log("this.selectedMiscName",this.PMSMiscDetailForm.value['selectedMiscName']);
    
    if(this.PMSMiscDetailForm.value['selectedMiscName'] != null){

      try {
        let Description: any[] = [];
        Description = _.filter(this.miscdetails, va =>{
          return va.MiscDtlDescription == "";
        })

        this.isValidation = true;
        this.ValidationMsg="";

        if(this.PMSMiscDetailForm.value['selectedMiscName'] == undefined || _.isEmpty(this.PMSMiscDetailForm.value['selectedMiscName'].name)){
          this.isValidation =false;
          this.ValidationMsg = "Please Select Type"
        }
        else if(Description.length !=0){
          this.isValidation=false;
          this.ValidationMsg="Please Enter Description";
        }

        if(this.isValidation){
          let dataBind:any={};
          dataBind.miscDtlId=0;
          dataBind.miscId = this.PMSMiscDetailForm.value['selectedMiscName'].miscId;
          dataBind.MiscDtlDescription="";

          dataBind.edit=true;
          dataBind.userId=0;
          dataBind.unitId=0;
          dataBind.IsActive=1;
          this.miscdetails.push(dataBind);
        }
        else{

        }

        
      } catch (error) {
        alert(error)
      }
    }
    else{
      this.notificationsService(PMSValidation.NOTIFICATION_VALIDATION,'Validation Message',"Please select Misc Name")
    }
  }

  RemoveRows(data:any, index:number ){

    this.miscdetails[0].MiscDtlDescription='';

  }

 private notificationsService(_severity:any,_summary:any,_message:any){
    this.messageService.add({severity:_severity, summary:_summary, detail:_message , life:3000});
    return;
 }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import {  IMiscDetails } from 'src/app/+fiscal/services/interfaces/IMisc';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';


@Component({
  selector: 'app-misc-detail',
  templateUrl: './misc-detail.component.html',
  styleUrls: ['./misc-detail.component.scss']
})
export class MiscDetailComponent {
  
  miscdetails:IMiscDetails[]=[];
  cols:any[]=[];
  // item:IMiscDetails={};

  selectedItems:IMiscDetails[]=[];

  public buttonText:string="Save"

  MiscDetailForm:FormGroup<YupFormControls<IMiscDetails>>;

  initialValues:IMiscDetails={
    miscDetailId:null,
    name:null,
    description:null,

    userId:null,
    unitId:null,
    isActive:null,
    ipAddress:null
  }

  constructor(
    private router:Router,
    private customerService:CustomerService,
    private utilService:UtilService
  ){
      this.MiscDetailForm=FormHandler.controls<IMiscDetails>(this.initialValues);

  }
  ngOnInit(){
    // this.customerService.getMiscDetailcLarge().then(miscdetails => this.miscdetails=miscdetails)
  }

  onGlobalFilter(table:Table , event:Event){
    table.filterGlobal((event.target as HTMLInputElement).value,'contains')
  }
  navigateToCreateUser(){
        this.router.navigate(['/apps/fiscal/misc'])
  }
  formError = (controlName:string,formName:any)=>{
    return this.utilService.formError(controlName,formName)
  };


  Clear(){

  }

  Save(){

  }

  AddRows(){

  }
  RemoveRows(data:any, index:number){

  }
  EnableEdit(data:any , index:number){

  }
  Edit(item:any){

  }
  Delete(){

  }
}

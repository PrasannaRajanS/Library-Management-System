import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IPeriod } from '../../services/interfaces/IPeriod';
import { Table } from 'primeng/table';

import * as yup from "yup";
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { YupSchoolValidation } from '../../services/validation-schemas/yup-validation-schema';

import { ProductService } from 'src/app/demo/service/product.service';
import { UtilService } from 'src/app/shared/util.service';
import { SchoolAPIConfig } from '../../services/school-api-config';
import { MessageService } from 'primeng/api';
import { SchoolValidation } from '../../services/school-validation';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';

import { AppConstant } from 'src/app/config/app.constant';
import { IType } from '../../services/interfaces/IType';



@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent {

 TypeList: IType[] = [];

  buttonText:string = "Save"
  PeriodId: number | null | undefined =0;

  public userDetails: any;
  IsUpdate: boolean = false;

  cols: any[] = [];
  items: IPeriod[] = [];
  item: IPeriod = {};
  selectedItems: IPeriod[] = [];

  deleteDialog: boolean = false

  PeriodForm: FormGroup<YupFormControls<IPeriod>>    //  Step 1

   //  Step 2
  initialValues: IPeriod = {

    periodId:0,
    selectedtype:null,
    name:null,
    startTime:null,
    endTime:null,
    description:null,
    
    isActive: null,
    userId: null,
    ipAddress: null,
  }

  validationSchema:yup.ObjectSchema<IPeriod> = YupSchoolValidation.PERIOD    //  Step 3

    //  Step 4
    formError = (controlName: string, formName: any) => {
      return this.utilService.formError(controlName, formName);
    }

  constructor(
    private productService: ProductService,
    private utilService: UtilService,
    private messageService: MessageService,
    private httpService: CommonHttpService,

  ){

    this.TypeList = AppConstant.TypeList;
    this.PeriodForm = FormHandler.controls<IPeriod>(this.initialValues)
    this.PeriodForm.setValidators(FormHandler.validate<IPeriod>(this.validationSchema))
  }

  ngOnInit() {
    this.GetAll();
  }

  // validateRomanNumeral(event: KeyboardEvent) {
  //   let input = event.key.toUpperCase();
  //   let romanNumeralPattern = /^[IVXLCDM]*$/; // Regular expression to match Roman numerals

  //   if (!romanNumeralPattern.test(input) && input !== 'BACKSPACE') {
  //     event.preventDefault();
  //   }
  // }

  public GetAll() {
    this.productService.getPeriod().then((data) => {
      this.items = data
    })
  }

  Save(){

    try {
      let _apiUrl:string = '';
      let passSaveParams: any = {};
      if (this.IsUpdate) { // UPDATE
        
        passSaveParams.periodId = this.PeriodId;
        passSaveParams.selectedtype = this.PeriodForm.value['selectedtype'] != null ? this.PeriodForm.value['selectedtype']:'';
        passSaveParams.name = this.PeriodForm.value['name'] != null ? this.PeriodForm.value['name']:'';
        passSaveParams.startTime = this.PeriodForm.value['startTime'] != null ? this.PeriodForm.value['startTime']:'';
        passSaveParams.endTime = this.PeriodForm.value['endTime'] != null ? this.PeriodForm.value['endTime']:'';
        passSaveParams.description = this.PeriodForm.value['description'] != null ? this.PeriodForm.value['description']:'';

        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = SchoolAPIConfig.API_CONFIG.API_URL.MASTER.Period.UPDATE
      }
       else { //  SAVE
        
        passSaveParams.periodId = this.PeriodId;
        passSaveParams.selectedtype = this.PeriodForm.value['selectedtype'] != null ? this.PeriodForm.value['selectedtype']:'';
        passSaveParams.period = this.PeriodForm.value['name'] != null ? this.PeriodForm.value['name']:'';
        passSaveParams.startTime = this.PeriodForm.value['startTime'] != null ? this.PeriodForm.value['startTime']:'';
        passSaveParams.endTime = this.PeriodForm.value['endTime'] != null ? this.PeriodForm.value['endTime']:'';
        passSaveParams.description = this.PeriodForm.value['description'] != null ? this.PeriodForm.value['description']:'';

        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = SchoolAPIConfig.API_CONFIG.API_URL.MASTER.Period.SAVE
      }

      console.log('Before SAVE',passSaveParams);

      this.httpService.globalPost('',JSON.stringify(passSaveParams))
      .subscribe({
        next:(result: any)=>{
          this.Clear;
          this.notificationsService(SchoolValidation.NOTIFICATION_SUCCESS,' Success Message ',result.message)
        },
        error:(err: HttpErrorResponse)=>{
          console.log(err);
          
        }
      })
      
    } catch (error) {
      
    }
  }

  Clear(){
    this.buttonText = 'Save';
    this.IsUpdate = false;
    this.PeriodForm.reset();
    this.GetAll(); 
  }

  onGlobalFilter(table: Table, event: Event){

      table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );

  }

  Edit(item : any){

    console.log('Edit', item);
    this.PeriodId = item.periodId
    this.PeriodForm.controls['selectedtype']?.setValue(item.selectedtype)
    this.PeriodForm.controls['name']?.setValue(item.name)
    this.PeriodForm.controls['startTime']?.setValue(item.startTime)
    this.PeriodForm.controls['endTime']?.setValue(item.endTime)
    this.PeriodForm.controls['description']?.setValue(item.description)

    this.IsUpdate = true;
    this.buttonText = 'Update';
  }

  Delete(data : any){
    this.deleteDialog = true;
    this.item = { ...data };
  }

  confirmDelete(){

    this.deleteDialog = false;
    let deletedItem: any[] = this.items.filter(
      (val) => val.periodId === this.item.periodId
  );
  console.log('deletedItem', deletedItem);
  if (deletedItem != null && deletedItem.length > 0) {
    var passSaveParams: any = {};

    passSaveParams.periodId = deletedItem[0].periodId
    passSaveParams.selectedtype = deletedItem[0].selectedtype
    passSaveParams.name = deletedItem[0].name
    passSaveParams.startTime = deletedItem[0].startTime
    passSaveParams.endTime = deletedItem[0].endTime
    passSaveParams.description = deletedItem[0].description

    passSaveParams.isActive = false;
    passSaveParams.userId = this.userDetails ? this.userDetails.userId: 0;
    passSaveParams.ipAddress = '192.168.1.1';

    console.log(passSaveParams);

    this.httpService.globalPost(SchoolAPIConfig.API_CONFIG.API_URL.MASTER.Period.DELETE,
      JSON.stringify(passSaveParams))
      .subscribe({
        next: (result:any) => {
          this.Clear();
          this.notificationsService(SchoolValidation.NOTIFICATION_SUCCESS,   'success Message',
          result.message)
        },
        error: (err : HttpErrorResponse) => console.log(err)
      });

  }

  this.item = {};
  }

  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({
        severity: _severity,
        summary: _summary,
        detail: _message,
        life: 3000,
    });
    return;
}
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AdminAPIConfig } from 'src/app/+admin/services/admin-api-config';
import { IOrganization } from 'src/app/+fiscal/services/interfaces/IOrganization';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';

import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { OrganizationValidation } from 'src/app/+fiscal/services/organization-validation';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import * as yup from 'yup';

import { ProductService } from 'src/app/demo/service/product.service';
import { UtilService } from 'src/app/shared/util.service';
import { HttpService } from 'src/app/+admin/services/http.service';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {

  OrganizationId:any = 0;
  OrganizationList: IOrganization[]=[];

  
  public buttonText:string="Save";
  public userDetails: any;

  private IsUpdate:boolean=true;

  myFiles: string[] = [];

  selectedItems: IOrganization[] = [];
  item: IOrganization = {};
  items: IOrganization[] = [];

  public ImagePath: string | undefined = "";

  logoURL:any;
  iconURL:any;




  // public OrganizationId

  //#region UI Validation Declarations
  OrganizationForm: FormGroup<YupFormControls<IOrganization>>; //  Step 1

  initialValues: IOrganization = {
    //  Step 2
    organizationId: 0,
    name: null,
    shortName: null,
    addressOne: null,
    addressTwo: null,
    addressThree: null,
    addressFour: null,
    city: null,
    state: null,
    country: null,
    pinCode: null,
    phoneNumber: null,
    fax: null,
    mobileNumber: null,
    email: null,
    website: null,

    isActive: null,
    userId: null,
    ipAddress: null
  };

  validationSchema: yup.ObjectSchema<IOrganization> = YupFiscalValidation.ORGANIZATION; //  Step 3

  formError = (controlName: string, formName: any) => {
    //  Step 4
    return this.utilService.formError(controlName, formName);
  };
  //#endregion


  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private messageService: MessageService,
    private productService:ProductService,
    private router:Router
  ) {
    this.OrganizationForm = FormHandler.controls<IOrganization>(this.initialValues); //  Step 5
    this.OrganizationForm.setValidators(FormHandler.validate<IOrganization>(this.validationSchema)
 
    );
  }

  ngOnInit(){
    this.fnGetOrganizationById();
  }

  //  list button

  RedirecttoList(){
    this.router.navigate(['/apps/fiscal/organization-list']);  
  }




  getOrganizationLogo($event: any) {

    if ($event.length === 0) {
      return;
    }
    for (var i = 0; i < $event.target.files.length; i++) {
      var mimeType = $event.target.files[i].type;
      if (mimeType.match(/image\/*/) == null) {
        this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation', "Only images are supported.")
        return;

      }

      // #endRegion
      this.myFiles.push($event.target.files[i]);

    }
    this.ImagePath = $event.target.files;
      //#region PREVIEW IMAGE

      var reader = new FileReader();
      this.ImagePath=$event.target.files;
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (_event)=>{
        this.logoURL=reader.result;
      }
  }

  
  getFavicon($event: any) {

    if ($event.length === 0) {
      return;
    }
    for (var i = 0; i < $event.target.files.length; i++) {
      var mimeType = $event.target.files[i].type;
      if (mimeType.match(/image\/*/) == null) {
        this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation', "Only images are supported.")
        return;

      }

      // #endRegion
      this.myFiles.push($event.target.files[i]);

    }
    this.ImagePath = $event.target.files;
      //#region PREVIEW IMAGE

      var reader = new FileReader();
      this.ImagePath=$event.target.files;
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (_event)=>{
   
        this.iconURL=reader.result;
      }
  }

  
  Save(){

    try {

      let _apiUrl: string = '';
      let passSaveParams: any = {};

      if(this.IsUpdate){ //  UPDATE


        passSaveParams.organizationId = this.OrganizationId;
        passSaveParams.name = this.OrganizationForm.value['name'];
        passSaveParams.shortName = this.OrganizationForm.value['shortName']
        passSaveParams.addressOne = this.OrganizationForm.value['addressOne']
        passSaveParams.addressTwo = this.OrganizationForm.value['addressTwo']
        passSaveParams.addressThree = this.OrganizationForm.value['addressThree']
        passSaveParams.addressFour = this.OrganizationForm.value['addressFour']
        passSaveParams.city = this.OrganizationForm.value['city']
        passSaveParams.state = this.OrganizationForm.value['state']
        passSaveParams.country = this.OrganizationForm.value['country']
        passSaveParams.pinCode = this.OrganizationForm.value['pinCode']
        passSaveParams.phoneNumber = this.OrganizationForm.value['phoneNumber']
        passSaveParams.fax = this.OrganizationForm.value['fax']
        passSaveParams.mobileNumber = this.OrganizationForm.value['mobileNumber']
        passSaveParams.email = this.OrganizationForm.value['email']
        passSaveParams.website = this.OrganizationForm.value['website']


        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ORGANIZATION.UPDATE

        
      }
      else{ //  SAVE

        passSaveParams.organizationId = this.OrganizationId;
        passSaveParams.name = this.OrganizationForm.value['name'];
        passSaveParams.shortName = this.OrganizationForm.value['shortName'];
        passSaveParams.addressOne = this.OrganizationForm.value['addressOne'];
        passSaveParams.addressTwo = this.OrganizationForm.value['addressTwo'];
        passSaveParams.addressThree = this.OrganizationForm.value['addressThree'];
        passSaveParams.addressFour = this.OrganizationForm.value['addressFour'];
        passSaveParams.city = this.OrganizationForm.value['city'];
        passSaveParams.state = this.OrganizationForm.value['state'];
        passSaveParams.country = this.OrganizationForm.value['country'];
        passSaveParams.pinCode = this.OrganizationForm.value['pinCode'];
        passSaveParams.phoneNumber = this.OrganizationForm.value['phoneNumber'];
        passSaveParams.fax = this.OrganizationForm.value['fax'];
        passSaveParams.mobileNumber = this.OrganizationForm.value['mobileNumber'];
        passSaveParams.email = this.OrganizationForm.value['email'];
        passSaveParams.website = this.OrganizationForm.value['website'];


        passSaveParams.isActive = true;
        passSaveParams.userId = this.userDetails ? this.userDetails.UserId : 0;
        passSaveParams.ipAddress = "192.168.1.1";

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.ORGANIZATION.SAVE
     
        console.log(passSaveParams);
        
      }

      console.log("Save / Update Click", JSON.stringify(passSaveParams));

      this.httpService.globalPost(_apiUrl,JSON.stringify(passSaveParams))
      .subscribe({
        next: (result: any) =>{
          this.notificationsService(OrganizationValidation.NOTIFICATION_SUCCESS ,'Success Message',result.message)
          this.Clear()
        },
        error: (err: HttpErrorResponse) => console.log(err)
        
        
      })
      

    } catch (error) {
      
    }
  }

  Clear(){
    this.buttonText = "Save";
    this.IsUpdate = false;
    this.OrganizationForm.reset();
  }


  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }

  onGlobalFilter(table: Table , event:Event){
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  Edit(item:any){

    console.log('edit',item);

    this.OrganizationForm.controls['name']?.setValue(item.name);
    this.OrganizationForm.controls['shortName']?.setValue(item.shortName);
    this.OrganizationForm.controls['addressOne']?.setValue(item.addressOne);
    this.OrganizationForm.controls['addressTwo']?.setValue(item.addressTwo);
    this.OrganizationForm.controls['addressThree']?.setValue(item.addressThree);
    this.OrganizationForm.controls['addressFour']?.setValue(item.addressFour);
    this.OrganizationForm.controls['city']?.setValue(item.city);
    this.OrganizationForm.controls['state']?.setValue(item.state);
    this.OrganizationForm.controls['country']?.setValue(item.country);
    this.OrganizationForm.controls['pinCode']?.setValue(item.pinCode);

    this.OrganizationForm.controls['phoneNumber']?.setValue(item.phoneNumber);
    this.OrganizationForm.controls['fax']?.setValue(item.fax);
    this.OrganizationForm.controls['mobileNumber']?.setValue(item.mobileNumber);
    this.OrganizationForm.controls['email']?.setValue(item.email);
    this.OrganizationForm.controls['website']?.setValue(item.website);

    
this.IsUpdate=true
this.buttonText="Update"

  }





  public  fnGetOrganizationById(){

    try {
     this.httpService.globalGet(AdminAPIConfig.API_CONFIG.API_URL.ADMIN.ORGANIZATION.EDIT + '/?organizationId='+ this.OrganizationId )
     .subscribe({
        next:(result:any) =>{
        this.OrganizationList = result.pages;
        console.log('fnGetByPageId',this.OrganizationList);

        if(this.OrganizationList != undefined && this.OrganizationList,length > 0){
                this.OrganizationId=this.OrganizationList[0].organizationId;

                this.OrganizationForm.get("name")?.setValue(this.OrganizationList[0].name);
                this.OrganizationForm.get("shortName")?.setValue(this.OrganizationList[0].shortName);
        }
                    
        },
        error:(err:HttpErrorResponse)=> console.log('fnGetByPageId',err)
        
     })   
    } catch (error) {
        
    }

 }

}

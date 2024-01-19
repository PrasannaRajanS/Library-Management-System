import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/+admin/services/http.service';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { IOrganization } from 'src/app/+fiscal/services/interfaces/IOrganization';

import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';
import * as yup from 'yup';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {

  myFiles: string[] = [];

  public ImagePath: string | undefined = "";

  logoURL:any;
  iconURL:any;

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
    private _datePipe: DatePipe
  ) {
    this.OrganizationForm = FormHandler.controls<IOrganization>(this.initialValues); //  Step 5
    this.OrganizationForm.setValidators(FormHandler.validate<IOrganization>(this.validationSchema)
    );
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



  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }

}

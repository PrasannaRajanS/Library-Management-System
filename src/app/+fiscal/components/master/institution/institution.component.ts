import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IInstitution } from 'src/app/+fiscal/services/interfaces/IInstitution';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {


  // 1.
  public buttonText:string="Save";

  InstitutionFrom:FormGroup<YupFormControls<IInstitution>>;

  initialValues: IInstitution ={
    // 1
    organizationId:0,
    organizationName:null,
    nameOfSchool:null,
    shortName:null,
    schoolUDiseCode:null,
    affiliatedCode:null,
    category:null,

    // 2
    addressOne:null,
    addressTwo:null,
    addressThree:null,
    addressFour:null,
    city:null,
    stateId:null,
    countryId:null,
    pinCode:null,
    fax:null,
    mobileNumber1:null,
    mobileNumber2:null,
    phoneNumber1:null,
    phoneNumber2:null,
    primaryEmail:null,
    secondaryEmail:null,
    website:null,

    // 3

    isActive:null,
    userId:null,
    ipAddress:null

  };

  formError=(controlName:string, formName:any) =>{
    return this.utilService.formError(controlName,formName);
  }

  constructor(
    private utilService:UtilService
    
  ){
    this.InstitutionFrom=FormHandler.controls<IInstitution>(this.initialValues);
  }

  Clear(){

  }
  Save(){

  }
}

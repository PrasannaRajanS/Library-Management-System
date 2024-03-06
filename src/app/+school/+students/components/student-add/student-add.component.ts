import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { IStudent } from 'src/app/+school/services/interfaces/IStudent';

import { ICountry } from 'src/app/shared/interface/ICountry';
import { IState } from 'src/app/shared/interface/IState';
import { UtilService } from 'src/app/shared/util.service';

import * as yup from 'yup';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { YupSchoolValidation } from 'src/app/+school/services/validation-schemas/yup-validation-schema';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent {


  public buttonText: string = "Save"

  filteredStateList: IState[] = [];
  StateList: IState[] = [];

  CoutryList: ICountry[] = [];
  filteredCoutryList: ICountry[] = [];

  StudentForm: FormGroup<YupFormControls<IStudent>>

  initialValues: IStudent = {

    studentId: null,
    rollNo: null,
    admissionNo: null,
    ewsNo: null,
    firstName: null,
    lastName: null,
    gender: null,
    DOB: null,
    age: null,

    // Present Address
    presentAddress1: null,
    presentAddress2: null,
    presentAddress3: null,
    presentCity: null,
    selectedPresentState: null,
    presentCountryId: null,
    selectedPresentCountry: null,
    presentPIN: null,

    // Permanent Address
    permanentAddress1: null,
    permanentAddress2: null,
    permanentAddress3: null,
    permanentCity: null,
    permanentState: null,
    permanentCountry: null,
    permanentPIN: null,

    //  Emergency Contact Info
    contactPerson1: null,
    mobileNo1: null,
    contactPerson2: null,
    mobileNo2: null,
    bloodGroup: null,

    // Unique Number Info
    nationality: null,
    panNo: null,
    community: null,
    aadhaarNo: null,
    uanNo: null,
    esiNo: null,
    epfNo: null,

    isActive: null,
    userId: null,
    ipAddress: null,

  };

  validationSchemaL: yup.ObjectSchema<IStudent> = YupSchoolValidation.STUDENT

  formError = (controlName: string, formName: any) => {
    return this.utilService.formError(controlName, formName);
  };

  constructor(
    private utilService: UtilService,
  ) {
    this.StudentForm = FormHandler.controls<IStudent>(this.initialValues);
    this.StudentForm.setValidators(FormHandler.validate<IStudent>(this.validationSchemaL))
  }

  Save() {

  }

  RedirecttoList() {

  }

  Clear() {

  }

  filterState(event: AutoCompleteCompleteEvent) {

  }

  onSelectState() {

  }

  onClearState() {

  }

  filterCountry(event: AutoCompleteCompleteEvent) {

  }

  filterMagePage(event: AutoCompleteCompleteEvent) {

  }
}

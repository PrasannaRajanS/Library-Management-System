import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { S } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/+admin/services/http.service';

import { IAcademicYear } from 'src/app/+fiscal/services/interfaces/IAcademicYear';
import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-page-creation';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';
import * as yup from "yup";

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.scss']
})
export class FiscalYearComponent {

  buttonText:string = 'Save';
  

  //#region UI Validation Variables
  AcademicYearForm: FormGroup<YupFormControls<IAcademicYear>>;  //  Step 1

  initialValues: IAcademicYear = {   //  Step 2
    academicYearId: null,
    academicYear: null,
    startDate: null,
    endDate: null,
    accountYear: null,
    isDefault: null,

    isActive: null,
    userId: null,
    ipAddress: null
  }

  validationSchema: yup.ObjectSchema<IAcademicYear> = YupFiscalValidation.ACADEMIC_YEAR;  //  Step 3

  formError = (controlName: string, formName: any) => {   //  Step 4
    return this.utilService.formError(controlName, formName);
  };
  //#endregion


  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private messageService: MessageService
  ) {
    this.AcademicYearForm = FormHandler.controls<IAcademicYear>(this.initialValues);  //  Step 5
    this.AcademicYearForm.setValidators(FormHandler.validate<IAcademicYear>(this.validationSchema));
  }


  Save(){

  }

  Clear(){

  }
}

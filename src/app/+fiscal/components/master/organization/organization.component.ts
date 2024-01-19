import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/+admin/services/http.service';
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

  //#region UI Validation Declarations
  OrganizationForm: FormGroup<YupFormControls<IOrganization>>; //  Step 1

    initialValues: IOrganization = {
        //  Step 2
        organizationId: 0,
        name: null,
        shortName: null,

        isActive: null,
        userId: null,
        ipAddress: null,
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
    private _datePipe : DatePipe
) {
    this.OrganizationForm = FormHandler.controls<IOrganization>( this.initialValues ); //  Step 5
    this.OrganizationForm.setValidators(FormHandler.validate<IOrganization>(this.validationSchema)
    );
}
}

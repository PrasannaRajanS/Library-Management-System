import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';

import { YupFiscalValidation } from 'src/app/+fiscal/services/validation-schemas/yup-validation-schema';
import { ProductService } from 'src/app/demo/service/product.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { IMisc } from 'src/app/shared/interface/IMisc';
import { UtilService } from 'src/app/shared/util.service';

import * as yup from "yup";


@Component({
    selector: 'app-misc',
    templateUrl: './misc.component.html',
    styleUrls: ['./misc.component.scss'],
})
export class MiscComponent {
    public miscId: number | null | undefined = 0;

    public userDetails: any;
    public unitDetails: any;
    public buttonText: string = 'Save';

    private IsUpdate: boolean = false;
    items: IMisc[] = [];

    MiscForm: FormGroup<YupFormControls<IMisc>>;

    initialValues: IMisc = {
        miscId: 0,
        name: null,
        description: null,
        selectedMiscName:null,
        isActive:null,
        unitId:null,
        userId:null,
        ipAddress:null

    };

    validationSchema:yup.ObjectSchema<IMisc>=YupFiscalValidation.MISC;
    

    formError = (controlName: string, formName: any) => {
        return this.utilService.formError(controlName, formName);
    };

 

    constructor(
        private messageService: MessageService,
        private utilService: UtilService,
        private productService: ProductService
    ) {
        this.MiscForm = FormHandler.controls<IMisc>(this.initialValues);
        this.MiscForm.setValidators(FormHandler.validate<IMisc>(this.validationSchema));
    }

    // GetAll() {
    //     this.productService.getMisc().then((data) => {
    //         this.items = data;
    //     });
    // }

    Save() {
        try {
            let _apiUrl: string = '';
            let passSaveParams: any = {};

            if (this.IsUpdate) { //  UPDATE

                passSaveParams.miscId = this.miscId;
                passSaveParams.name = this.MiscForm.value['name'];
                passSaveParams.description = this.MiscForm.value['description'];

                passSaveParams.isActive = true;
                passSaveParams.unitId = this.unitDetails ? this.unitDetails.unitId : 0;
                passSaveParams.userId = this.userDetails ? this.userDetails.userId  : 0;
                passSaveParams.ipAddress = '192.168.1.1';

                _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Misc.UPDATE;
            } else { //  SAVE

                passSaveParams.miscId = this.miscId;
                passSaveParams.name = this.MiscForm.value['name'];
                passSaveParams.description = this.MiscForm.value['description'];

                passSaveParams.isActive = true;
                passSaveParams.unitId = this.unitDetails ? this.unitDetails.unitId : 0;
                passSaveParams.userId = this.userDetails ? this.userDetails.userId  : 0;
                passSaveParams.ipAddress = '192.168.1.1';

                _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Misc.SAVE;
            }
            console.log('Before save', passSaveParams);
        } catch (error) {}
    }

    Clear() {
        this.buttonText = 'Save';
        this.IsUpdate = false;
        this.MiscForm.reset();
        // this.GetAll();
    }
}

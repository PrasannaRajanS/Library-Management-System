import { Injectable } from '@angular/core';
import * as _ from "lodash";
// import { DateformatPipe } from '../pipes/dateformat.pipe';
import { AppConstant } from '../app.constant';
import { MessagesService } from "./messages.service";
// import * as jsPDF from 'jspdf';  
// import * as rasterizeHTML from 'rasterizehtml';

@Injectable()

export class UtilService {
   /**
    * formError
    */
   public formError (controlName: string, formName : any)  {
    const control = formName.get(controlName);
    if (control?.pristine && !control.touched) return;
    return formName?.errors?.[controlName];
  };
}
 
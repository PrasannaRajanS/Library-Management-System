import { Injectable } from '@angular/core';

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
 
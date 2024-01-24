import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { IMisc } from 'src/app/+fiscal/services/interfaces/IMisc';
import { ProductService } from 'src/app/demo/service/product.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';
import { number } from 'yup';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss']
})
export class MiscComponent {

  public miscId: number | null | undefined = 0


  public buttonText: string = "Save";

  private IsUpdate: boolean = false;
  items: IMisc[] =[];

  MiscForm: FormGroup<YupFormControls<IMisc>>;

  initialValues: IMisc = {
    miscId: 0,
    name: null,
    description: null
  }

  formError = (controlName: string, formName: any) => {
    return this.utilService.formError(controlName, formName);
  };

  constructor(
    private messageService: MessageService,
    private utilService: UtilService,
    private productService:ProductService
  ) {
    this.MiscForm = FormHandler.controls<IMisc>(this.initialValues);
  }


  GetAll() {
      this.productService.getMisc().then((data)=>{
        this.items=data;
      })
  }


  Save() {


    try {

      let _apiUrl:string='';
      let passSaveParams:any ={};

      if (this.IsUpdate) {  //  UPDATE

        passSaveParams.miscId = this.miscId;
        passSaveParams.name = this.MiscForm.value['name'];
        passSaveParams.description = this.MiscForm.value['description']

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Misc.UPDATE;
        
      } else {   //  SAVE

        passSaveParams.miscId = this.miscId;
        passSaveParams.name = this.MiscForm.value['name'];
        passSaveParams.description = this.MiscForm.value['description']

        _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Misc.SAVE;
      }
      console.log('Before save',passSaveParams);
      
      
      
    } catch (error) {
      
    }
  }

  Clear() {
    this.buttonText = "Save";
    this.IsUpdate = false;
    this.MiscForm.reset();
    this.GetAll();

  }

}

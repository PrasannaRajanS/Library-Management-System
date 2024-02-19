import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Table } from 'primeng/table';

import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { UtilService } from 'src/app/shared/util.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';
import { IMisc, IMiscDetails } from 'src/app/shared/interface/IMisc';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { AdminValidation } from 'src/app/+admin/services/admin-validation';


@Component({
  selector: 'app-misc-detail',
  templateUrl: './misc-detail.component.html',
  styleUrls: ['./misc-detail.component.scss']
})
export class MiscDetailComponent {

  // Save
  public buttonText: string = 'Save';
  public IsUpdate: boolean = false;
  public miscId: number | undefined | null = 0;
  public userDetails: any;

  private isValidation: boolean = true;
  private ValidationMsg: string = "";

  autocomplete: any;


  private DeletedMiscDtls: IMiscDetails[] = [];

  //  List of items array
  selectedMiscName: IMisc = {};
  filteredMiscList: IMiscDetails[] = [];
  miscItems:IMiscDetails[]=[];
  filteredMiscDetailList:IMiscDetails[]=[];
  miscDtlItems:IMiscDetails[]=[]
  MiscList: IMisc[] = []


  // for list
  cols: any[] = []
  // Grid 
  items: IMiscDetails[] = [];
  item: IMiscDetails = {};
  // For Grid Agaisnt Load data
  // filteredItems: IMiscDetails[] = [];
  // selectedItems: IMiscDetails[] = [];



  PMSMiscDetailForm: FormGroup<YupFormControls<IMiscDetails>>;
  formError = (controlName: string, formName: any) => {
    return this.utilService.formError(controlName, formName)
  }


  initialValues: IMiscDetails = {
    miscDtlId: null,
    miscId: null,
    miscDtlName: null,
    selectedMiscName: null,
    miscDtlDesc: null,

    userId: null,
    unitId: null,
    isActive: null,
    ipAddress: null
  }



  constructor(
    private utilService: UtilService,
    private messageService: MessageService,
    private httpService: CommonHttpService,


  ) {

    this.PMSMiscDetailForm = FormHandler.controls<IMiscDetails>(this.initialValues);
  }

  // step 1

  public GetAllMiscs() {
    try {
      this.httpService
        .globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.PMS.LIST + '?keyWord=PMS')
        .subscribe({
          next: (result: any) => {
            this.miscItems = result.miscs;
            this.filteredMiscList = this.miscItems;
            console.log('GetAll', this.filteredMiscList);
          },
          error: (err: HttpErrorResponse) => console.log(err),
        });
    } catch (error) { }
  }

  public GetAllMiscDetails() {
    try {
        this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.PMS.DETAILS + '?keyWord=PMS')
            .subscribe({
                next: (result: any) => {
                    this.miscDtlItems = result.miscDtls;
                    this.filteredMiscDetailList = this.miscDtlItems;
                    console.log('GetAllMiscDetails', this.filteredMiscDetailList);
                },
                error: (err: HttpErrorResponse) => console.log(err),
            });
    } catch (error) { }
}

  ngOnInit() {
    this.GetAllMiscs();
    this.GetAllMiscDetails();
  }

  // step 2

  filterMisc(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.miscItems as any[]).length; i++) {
      let misc = (this.miscItems as any[])[i];

      if (misc.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(misc);
      }
    }

    this.filteredMiscList = filtered;
  }




  // step 3 
  Clear() {
    this.IsUpdate = false;
    this.PMSMiscDetailForm.reset();
    this.filteredMiscDetailList = [];
    this.GetAllMiscs();
    this.GetAllMiscDetails();
    

  }

  // step 4
  onGlobalFilter(table: Table, event: Event) { table.filterGlobal((event.target as HTMLInputElement).value, 'contains'); }


  // step 5

  onSelectMiscName() {
    console.log(this.PMSMiscDetailForm.controls['selectedMiscName']);

    if (this.PMSMiscDetailForm.controls['selectedMiscName'] != null) {
      this.filteredMiscDetailList = _.filter(this.miscDtlItems, (val) => {
        return (val.miscId == this.PMSMiscDetailForm.controls['selectedMiscName']?.value.miscId)
      })
    }

  }







  // step 6

  public AddRows() {
    console.log("this.selectedMiscName", this.PMSMiscDetailForm.value['selectedMiscName']);

    if (this.PMSMiscDetailForm.value['selectedMiscName'] != null) {

      try {
        let _miscDtlName: any[] = [];
        _miscDtlName = _.filter(this.filteredMiscDetailList, va => {
          return va.miscDtlDesc == "";
        })

        this.isValidation = true;
        this.ValidationMsg = "";

        if (_miscDtlName.length != 0) {
          this.isValidation = false;
          this.ValidationMsg = "Please Enter Misc Detail Name.";
        }

        if (this.isValidation) {
          let dataBind: any = {};
          dataBind.miscDtlId = 0;
          dataBind.miscId = this.PMSMiscDetailForm.value['selectedMiscName'] != null ? this.PMSMiscDetailForm.value['selectedMiscName'].miscId : 0;
          dataBind.miscName = "";
          dataBind.miscDtlName = "";
          dataBind.miscDtlDesc = "";
          // dataBind.keyWord="PMS";
          dataBind.edit = true;
          dataBind.isActive = true;
          this.filteredMiscDetailList.push(dataBind);
        }
        else {
          this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation Message', this.ValidationMsg)
        }


      } catch (error) {
        alert(error)
      }
    }
    else {
      this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation Message', "Please select Misc Name")
    }
  }



  Save() {
      try {
        let _apiUrl: string = '';
        let passSaveParams: any = {};
        passSaveParams.miscDtlList ={};
        passSaveParams.miscDtlList.miscDtl=[];
        this.isValidation =true;
        this.ValidationMsg="";

        let _miscDtlName :any[]=[];

        _miscDtlName = _.filter(this.filteredMiscDetailList , (va)=>{
          return va.miscDtlName == '';
        })

        if(this.PMSMiscDetailForm.value['selectedMiscName'] == undefined || 
        _.isEmpty(this.PMSMiscDetailForm.value['selectedMiscName'].name || 
        this.PMSMiscDetailForm.value['selectedMiscName']== null))
        {
            this.isValidation=false;
            this.ValidationMsg='Please Select Type.';
        }

        else if(_miscDtlName.length !=0){
              this.isValidation = false;
              this.ValidationMsg = 'Please Enter Misc Detail Name.';
        }

        if(this.isValidation){
          _.each(this.filteredMiscDetailList, va => {
            va.isActive = true;
            passSaveParams.miscDtlList.miscDtl.push(va);
          });

          _.each(this.DeletedMiscDtls,va =>{
            va.isActive = false;
            passSaveParams.miscDtlList.miscDtl.push(va);
          });

          passSaveParams.miscDtlList.keyWord = "PMS";
          passSaveParams.miscDtlList.userId = this.userDetails ? this.userDetails.userId : 0;
          passSaveParams.miscDtlList.ipAddress = '192.168.1.1';

          _apiUrl = FiscalAPIConfig.API_CONFIG.API_URL.MASTER.PMS.CREATE_UPDATE_DELETE;
          console.log(JSON.stringify(passSaveParams));
          this.httpService.globalPost(_apiUrl,JSON.stringify(passSaveParams))
          .subscribe({next: (result:any)=>{
            this.notificationsService(AdminValidation.NOTIFICATION_SUCCESS,'Success Message',result.message);
            this.Clear();

            
          },
          
          error:(err:HttpErrorResponse)=>console.log(err),
          
        })

        }
        else {
          this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION,'Validation Message',this.ValidationMsg );

        }

        
      } catch (error) {
        
      }
  }


  RemoveRows(data: any, index: number) {
    try {
      if(+data.miscDtlId !=0){
        this.DeletedMiscDtls.push(data);
      }
      this.filteredMiscDetailList.splice(index,1);
      this.filteredMiscDetailList = [...this.filteredMiscDetailList]
    } catch (error) {
      alert(error);
    }
  }



  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }




}

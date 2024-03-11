import { state, style, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { IAcademicYear } from 'src/app/+fiscal/services/interfaces/IAcademicYear';
import { IAdmission, IStandard } from 'src/app/+school/services/interfaces/IAdmission';
import { APIConfig } from 'src/app/config/api.config';
import { ProductService } from 'src/app/demo/service/product.service';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { IMiscDetails } from 'src/app/shared/interface/IMisc';
import { IState } from 'src/app/shared/interface/IState';
import * as yup from "yup";
import * as _ from 'lodash';


@Component({
  selector: 'app-admission-add',
  templateUrl: './admission-add.component.html',
  styleUrls: ['./admission-add.component.scss'],
  animations: [
    trigger('tabBar', [
        state('register', style({
            width: '33.3333%',
            left: '0'
        })),
        state('tier', style({
            width: '33.3333%',
            left: '33.3333%'
        })),
        state('payment', style({
            width: '33.3333%',
            left: '66.6667%'
        }))
    ])
]
})
export class AdmissionAddComponent {

 
  item:IAcademicYear={}

    items:IAcademicYear[]=[];
    StateList:IState[]=[];
    filteredStateList:IState[]=[];
    
    CoutryList: ICountry[] = [];
    

  activeTab = 'student-information';

  activeCard = '';

  filteredCoutryList: ICountry[] = [];

  dropdownOptions1: SelectItem[];

  dropdownOptions2: SelectItem[];

  selectDropdownOptions1: any;

  selectDropdownOptions2: any;

  birthdate!: Date;

  checked = false;

  radioButton1!: string;
  
  deleteDialog:boolean=false;

  // DDL
  standardtList:IStandard[]=[]


  IpAddress="192.168.1.1";

  miscDtlItems: IMiscDetails[] = [];
  filteredMiscDetailList: IMiscDetails[] = [];


  AdmissionForm:FormGroup<YupFormControls<IAdmission>>;

  initialValues:IAdmission ={
    studentApplicationNo:null,
    studentStandard:null,
    studentAcademicYear:null,
    studentAdmissionNo:null,

    selectedState:null,
    selectedCountry:null,
    // keyWord:null,
    ipAddress:null,
    isActive:null

  }

  constructor(
    private httpService:CommonHttpService,
    private productService:ProductService
  ) {
      this.dropdownOptions1 = [
          {label: 'Select Time Zone', value: null},
          {label: 'UTC-12.00', value: {id: 1, name: 'UTC-12.00', code: '-12'}},
          {label: 'UTC-11.00', value: {id: 2, name: 'UTC-11.00', code: '-11'}},
          {label: 'UTC-10.00', value: {id: 3, name: 'UTC-10.00', code: '-10'}},
          {label: 'UTC-09.30', value: {id: 4, name: 'UTC-09.30', code: '-93'}},
          {label: 'UTC-09.00', value: {id: 5, name: 'UTC-09.00', code: '-09'}},
          {label: 'UTC-08.00', value: {id: 6, name: 'UTC-08.00', code: '-08'}},
          {label: 'UTC-07.00', value: {id: 7, name: 'UTC-07.00', code: '-07'}},
          {label: 'UTC-06.00', value: {id: 8, name: 'UTC-06.00', code: '-06'}},
          {label: 'UTC-05.00', value: {id: 9, name: 'UTC-05.00', code: '-05'}},
          {label: 'UTC-04.00', value: {id: 10, name: 'UTC-04.00', code: '-04'}},
          {label: 'UTC-03.30', value: {id: 11, name: 'UTC-03.30', code: '-33'}},
          {label: 'UTC-03.00', value: {id: 12, name: 'UTC-03.00', code: '-03'}},
          {label: 'UTC-02.00', value: {id: 13, name: 'UTC-02.00', code: '-02'}},
          {label: 'UTC-01.00', value: {id: 14, name: 'UTC-01.00', code: '-01'}},
          {label: 'UTC-+00.00', value: {id: 15, name: 'UTC-+00.00', code: '-00'}},
          {label: 'UTC+01.00', value: {id: 16, name: 'UTC+01.00', code: '+01'}},
          {label: 'UTC+02.00', value: {id: 17, name: 'UTC+02.00', code: '+02'}},
          {label: 'UTC+03.00', value: {id: 18, name: 'UTC+03.00', code: '+03'}},
          {label: 'UTC+03.30', value: {id: 19, name: 'UTC+03.30', code: '+33'}},
          {label: 'UTC+04.00', value: {id: 20, name: 'UTC+04.00', code: '+04'}},
          {label: 'UTC+04.30', value: {id: 21, name: 'UTC+04.30', code: '+43'}},
          {label: 'UTC+05.00', value: {id: 22, name: 'UTC+05.00', code: '+05'}},
          {label: 'UTC+05.30', value: {id: 23, name: 'UTC+05.30', code: '+53'}},
          {label: 'UTC+05.45', value: {id: 24, name: 'UTC+05.45', code: '+54'}},
          {label: 'UTC+06.00', value: {id: 25, name: 'UTC+06.00', code: '+06'}},
          {label: 'UTC+06.30', value: {id: 26, name: 'UTC+06.30', code: '+63'}},
          {label: 'UTC+07.00', value: {id: 27, name: 'UTC+07.00', code: '+07'}},
          {label: 'UTC+08.00', value: {id: 28, name: 'UTC+08.00', code: '+08'}},
          {label: 'UTC+08.45', value: {id: 29, name: 'UTC+08.45', code: '+84'}},
          {label: 'UTC+09.00', value: {id: 30, name: 'UTC+09.00', code: '+09'}},
          {label: 'UTC+09.30', value: {id: 31, name: 'UTC+09.30', code: '+93'}},
          {label: 'UTC+10.00', value: {id: 32, name: 'UTC+10.00', code: '+10'}},
          {label: 'UTC+10.30', value: {id: 33, name: 'UTC+10.30', code: '+13'}},
          {label: 'UTC+11.00', value: {id: 34, name: 'UTC+01.00', code: '+11'}},
          {label: 'UTC+12.00', value: {id: 35, name: 'UTC+01.00', code: '+12'}},
          {label: 'UTC+12.45', value: {id: 36, name: 'UTC+01.00', code: '+24'}},
          {label: 'UTC+13.00', value: {id: 37, name: 'UTC+01.00', code: '+13'}},
          {label: 'UTC+14.00', value: {id: 38, name: 'UTC+01.00', code: '+14'}},
      ];

      this.AdmissionForm=FormHandler.controls<IAdmission>(this.initialValues);

      this.dropdownOptions2 = [
          {label: 'Where did you hear Ultima', value: null},
          {label: 'Blogs', value: 'Blogs'},
          {label: 'Google Ads', value: 'google'},
          {label: 'Your Forum', value: 'prime-forum'},
          {label: 'Youtube', value: 'Youtube'},
          {label: 'Reddit', value: 'Reddit'},
          {label: 'Events', value: 'Events'},
          {label: 'Other', value: 'Other'}
      ];
  }

  public GetAllMiscDetails() {
    try {
        this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.SCHOOL.DETAILS + '?keyWord=School')
            .subscribe({
                next: (result: any) => {
                    this.miscDtlItems = result.miscDtls;
                    this.filteredMiscDetailList = this.miscDtlItems;

                    const Standard= _.filter(result.miscDtls, 
                      (val)=>{return val.miscId == 1 })

                      this.standardtList=Standard.map((x)=>{
                        return <IStandard>{
                          standardId:x.miscDtlId,
                          standardTypeName:x.miscDtlName
                        }
                      })
                         
                    // console.log('GetAllMiscDetails', this.filteredMiscDetailList);
                },
                error: (err: HttpErrorResponse) => console.log(err),
            });
    } catch (error) { }
}





public GetCountries() {

    try {

      this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_COUNTRIES)
        .subscribe({
          next: (result: any) => {
            this.CoutryList = result.countries;
            console.log('GetCountries', this.CoutryList);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });

    } catch (error) {

    }
  }



filterCountry(event: AutoCompleteCompleteEvent) {

    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.CoutryList as any[]).length; i++) {
      let _countriesList = (this.CoutryList as any[])[i];
      if (_countriesList.countryName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_countriesList);
      }
    }
    this.filteredCoutryList = filtered;
  }

 public  filterState(event:AutoCompleteCompleteEvent){
    let filtered:any[]=[];
    let query =event.query;

    for(let i=0; i<(this.StateList as any[]).length;i++){
        let _stateList = (this.StateList as any[])[i];
        if(_stateList.stateName.toLowerCase().indexOf(query.toLowerCase())==0){
            filtered.push(_stateList);
        }
    }
      this.filteredStateList=filtered;
  }





public GetStates(){

  try {
          this.httpService.globalGet(APIConfig.API_CONFIG.API_URL.COMMON.GET_STATES)
          .subscribe({
            next:(result:any)=>{
              this.StateList=result.states;
            },
            error:(err:HttpErrorResponse) => console.log(err)
          });
  }
   catch (error) {

      
  }
}



public onSelectState(){
  if(this.AdmissionForm.value['selectedState']!=undefined && this.AdmissionForm.value['selectedState'] !=null ){
    let _countryId:number=this.AdmissionForm.value['selectedState'].countryId;
    this.AdmissionForm.get("selectedCountry")?.setValue(this.CoutryList.find(c=>c.countryId === _countryId))
      }

  else{
    this.AdmissionForm.get("selectedCountry")?.setValue(null)
  }

}

onClearState() {
  console.log('onClearState',this.AdmissionForm)
  this.AdmissionForm.get("selectedCountry")?.reset();
}

  public GetAcademicYear(){
    this.productService.getAcademicYears().then((data)=>{
      this.items=data; 
    })
  }

ngOnInit() {
    this.GetAllMiscDetails();
    this.GetCountries();
    this.GetStates();
    

}


  clickNext(step: string) {
      this.activeTab = step;
  }

  selectTier(card: string) {
      this.activeCard = card;
      this.activeTab = 'payment';
  }

  confirmDelete(){

  }

  Delete(){

  }

  Edit(){
    
  }

  public Save(){

    try {
    let _apiUrl:string='';
    let passSaveParams:any={};

    passSaveParams.studentAdmissionNo=this.AdmissionForm.value['studentAdmissionNo'] !=null ? this.AdmissionForm.value['studentAdmissionNo']:"";
    passSaveParams.studentStandard=this.AdmissionForm.value['studentStandard'] !=null ? this.AdmissionForm.value['studentStandard']:"";
    passSaveParams.studentAcademicYear=this.AdmissionForm.value['studentAcademicYear'] !=null ? this.AdmissionForm.value['studentAcademicYear']:"";
    passSaveParams.studentAdmissionNo=this.AdmissionForm.value['studentAdmissionNo'] !=null ? this.AdmissionForm.value['studentAdmissionNo']:"";


    passSaveParams.isActive=true;
    passSaveParams.ipAddress=this.IpAddress;


console.log(JSON.stringify(passSaveParams));
 
    } catch (error) {
      
    }

    
  }
}

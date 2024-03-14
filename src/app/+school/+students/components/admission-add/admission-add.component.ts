import { state, style, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { IAcademicYear } from 'src/app/+fiscal/services/interfaces/IAcademicYear';
import { IAdmission, IGender,  IMotherTongue, IReligion, IStandard } from 'src/app/+school/services/interfaces/IAdmission';

import { ProductService } from 'src/app/demo/service/product.service';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { FormHandler, YupFormControls } from 'src/app/shared/form-handler';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { IMiscDetails } from 'src/app/shared/interface/IMisc';
import { IState } from 'src/app/shared/interface/IState';
import * as _ from 'lodash';
import { PMSAPIConfig } from 'src/app/+pms/services/pms-api-config';
import { CommonService } from 'src/app/shared-services/common.service';
import { IBloodGroup, ICommunity, IQualification } from 'src/app/+pms/services/interfaces/IEmployee';
import { IBoard, IChildIsLiving, IMediumofInstruction, ITransportation } from 'src/app/+fiscal/services/interfaces/ICommon';
import { IClass } from 'src/app/shared/interface/ICommon';
import { MessageService } from 'primeng/api';
import { FiscalValidation } from 'src/app/+fiscal/services/fiscal-validation';


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
    filteredStateList:IState[]=[];
    
    NationalityList:ICountry[]=[]
    

  activeTab = 'student-information';

  activeCard = '';

  filteredCoutryList: ICountry[] = [];

  selectDropdownOptions1: any;

  selectDropdownOptions2: any;

  birthdate!: Date;

  checked = false;

  radioButton1!: string;
  
  deleteDialog:boolean=false;

  private isValidation: boolean = true;
  private ValidationMsg: string = "";

  // DDL
  standardtList:IClass[]=[];
  genderList: IGender[] = [];
  bloodGroupList: IBloodGroup[]=[];
  communityList:ICommunity[]=[];
  permanentStateList:IState[]=[];
  CoutryList: ICountry[] = [];
  StateList:IState[]=[]
  QualificationList:IQualification[]=[];
  ReligionList:IReligion[]=[];
  MotherTongueList:IMotherTongue[]=[];
  MediumOfInstructionList:IMediumofInstruction[]=[]
  boardAffiliatedList:IBoard[]=[];
  transportationList:ITransportation[]=[];
  childIsLivingWithList:IChildIsLiving[]=[];
  studiedList:IClass[]=[];
  

  IpAddress="192.168.1.1";

  miscDtlItems: IMiscDetails[] = [];
  filteredMiscDetailList: IMiscDetails[] = [];
 

// temp file we can delete it
  sibsiblingslist:IMiscDetails[]=[];
  cols:any[]=[];
  


  AdmissionForm:FormGroup<YupFormControls<IAdmission>>;

  initialValues:IAdmission ={

    // STUDENT INFO
    studentName:null,
    studentApplicationNo:null,
    studentStandard:null,
    studentAcademicYear:null,
    studentAdmissionNo:null,

    selectedGender:null,
    selectedNationality:null,
    selectedReligion:null,
    selectedMotherTongue:null,
    selectedBloodGroup:null,
    selectedCommunity:null,
    selectedVisaIssuedCountry:null,
    selectedPermanentStateList:null,
    selectedPermanentCountryList:null,
    selectedcommunicationStateList:null,
    selectedcommunicationCountryList:null,
    selectedFatherQualification:null,
    selectedMotherQualification:null,
    selectedGuardianQualification:null,

    // PRE CLASS INFO
    selectedStudied:null,
    selectedMediumOfInstruction:null,
    selectedBoard:null,
    selectedTransportation:null,
    selectedChildIsLivingWith:null,
    

    selectedState:null,
    selectedCountry:null,
    // keyWord:null,
    ipAddress:null,
    isActive:null

  }

  constructor(
    private httpService:CommonHttpService,
    private productService:ProductService,
    private commonService:CommonService,
    private messageService:MessageService
  ) {

      this.AdmissionForm=FormHandler.controls<IAdmission>(this.initialValues);
  }

  // EmployeeMiscDetails
  public GetAllEmployeeMiscDetails(){

    try {
        this.httpService.globalGet(PMSAPIConfig.API_CONFIG.API_URL.MASTER.EMPLOYEE.DATA)
        .subscribe({
          next: (result:any)=>{
              // Genders
              const genders = _.filter(
                result.loadEmployeesData.miscDtl,
                (val)=>{
                  return val.miscId == 14
                }
              )
              this.genderList=genders.map( (x)=>{ 
                return <IGender> { 
                   genderId:x.miscDtlId,
                     genderName:x.miscDtlName,   } } )

            // bloodGroups
            const bloodGroups =_.filter(
              result.loadEmployeesData.miscDtl,
              (val)=>{
                return val.miscId ==1
              }
            )
              this.bloodGroupList=bloodGroups.map(
                (x)=>{
                  return <IBloodGroup>{
                    bloodGroupId:x.miscDtlId,
                    bloodGroupName:x.miscDtlName,
                  }
                }
              )

              // communityList

              const community =_.filter(
                result.loadEmployeesData.miscDtl,
                (val)=>{
                  return val.miscId == 8
                }
              )

              this.communityList =community.map(
                (x)=>{
                  return <ICommunity>{
                    communityId:x.miscDtlId,
                    communityName:x.miscDtlName,
                  }
                }
              )

                  // eduQualification

                  const eduQualification = _.filter(
                    result.loadEmployeesData.miscDtl,
                    (val) => {
                        return val.miscId == 9;
                    }
                );

                this.QualificationList = eduQualification.map((x) => {
                    return <IQualification>{
                        qualificationId: x.miscDtlId,
                        qualificationName: x.miscDtlName,
                    };
                });





          }
        })
    } catch (error) {
      
    }
  }
  // SchoolMiscDetails
  public GetAllSchoolMiscDetails() {
    try {
        this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.SCHOOL.DETAILS + '?keyWord=School')
            .subscribe({
                next: (result: any) => {
                    this.miscDtlItems = result.miscDtls;
                    this.filteredMiscDetailList = this.miscDtlItems;

                    const Standard= _.filter(result.miscDtls, 
                      (val)=>{return val.miscId == 1 })

                      this.standardtList=Standard.map((x)=>{
                        return <IClass>{
                          classId:x.miscDtlId,
                          className:x.miscDtlName
                        }
                      })

                      this.studiedList=Standard.map((x)=>{
                        return <IClass>{
                          classId:x.miscDtlId,
                          className:x.miscDtlName
                        }
                      })

                      const Religions = _.filter(result.miscDtls,
                        (val)=>{
                          return val.miscId == 4 ;
                        }
                        )

                        this.ReligionList=Religions.map((x)=>{
                          return <IReligion>{
                              religionId:x.miscDtlId,
                              religionName:x.miscDtlName,

                          }
                        })

                        
                        const MotherTongue =_.filter(result.miscDtls,
                          (val)=>{
                            return val.miscId == 5;
                          }
                          )

                          this.MotherTongueList = MotherTongue.map((x)=>{
                            return <IMotherTongue>{
                              mothertongueId:x.miscDtlId,
                              mothertongueName:x.miscDtlName,
                            }
                          }) 


                        const  Transportations =_.filter(result.miscDtls,
                          (val)=>{
                             return val.miscId == 3
                          })

                          this.transportationList=Transportations.map((x)=>{
                              return <ITransportation>{
                                transportationId:x.miscDtlId,
                                transportationName:x.miscDtlName,
                              }
                          })

                          const childIsLivings = _.filter(result.miscDtls,
                            (val)=>{
                              return val.miscId == 6
                            })

                          this.childIsLivingWithList=childIsLivings.map((x)=>{
                            return <IChildIsLiving>{
                              childIsLivingWithId:x.miscDtlId,
                              childIsLivingWithName:x.miscDtlName,
                            }
                          })

                         
                },
                error: (err: HttpErrorResponse) => console.log(err),
            });
    } catch (error) { }
  }

  
  public GetAllFiscalMiscDetails(){
      try {
        this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.FISCAL.DETAILS +'?keyWord=Fiscal')
        .subscribe({
          next:(result:any)=>{
            const MediumOfInstructions = _.filter(result.miscDtls,
              (val)=>{
                return val.miscId == 6
              })

              this.MediumOfInstructionList = MediumOfInstructions.map((x)=>{
                return <IMediumofInstruction>{
                  instructionId:x.miscDtlId,
                  instruction:x.miscDtlName
                }
              })

              const affiliatesboards =_.filter(result.miscDtls,
                (val)=>{
                  return val.miscId == 7
                } )  
                
                this.boardAffiliatedList =affiliatesboards.map((x)=>{
                  return <IBoard>{
                    boardId:x.miscDtlId,
                    boardName:x.miscDtlName
                  }
                })

          }
        }

        )
      } catch (error) {
        
      }
  }


  public GetCountries(){
    try {
      this.commonService.getCountries().then((res)=>{
        this.CoutryList=res;
        this.NationalityList=res;
        
      })
    } catch (error) {
      
    }
  }

  public GetStates(){
      try {
        this.commonService.getStates().then((res)=>{
          this.StateList=res;
        })
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
    this.GetCountries();
    this.GetStates();
    this.GetAllSchoolMiscDetails();
    this.GetAllEmployeeMiscDetails();
    this.GetAllFiscalMiscDetails();

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

  RemoveRows(data:any,item:any){

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
  OnInputChangeStudentName(){
    try {
      if(this.AdmissionForm.value['studentName']){
          this.AdmissionForm.controls['studentName']?.setValue(this.AdmissionForm.value['studentName'].toUpperCase())
      }
    } catch (error) {
      
    }
      
  }

   public AddSiblingRows(){

    try {

      let _siblingName: any[] = [];
      _siblingName = _.filter(this.sibsiblingslist, va => {
        return va.miscDtlName == "";
      });

      this.isValidation = true;
      this.ValidationMsg = "";

      if (_siblingName.length != 0) {
        this.isValidation = false;
        this.ValidationMsg = "Please Enter Name";
      }
      if (this.isValidation) {
        let dataBind:any={};
        dataBind.miscDtlDesc="";
        dataBind.miscDtlName="";

          this.sibsiblingslist.push(dataBind);
      } else {
        this.notificationsService(FiscalValidation.NOTIFICATION_VALIDATION, 'Validation Message', this.ValidationMsg)
      }
    } catch (error) {
      
    }
  }


  private notificationsService(_severity: any, _summary: any, _message: any) {
    this.messageService.add({ severity: _severity, summary: _summary, detail: _message, life: 3000 });
    return;
  }
}

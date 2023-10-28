import { Component } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as yup from "yup";
import { Table } from 'primeng/table';
import { YupFormControls, FormHandler } from '../../../shared/form-handler';
import { MessagesService } from "../../../shared/messages.service";
import { IPageCreation } from "../../../shared/interfaces/Ipage-creation";
import { YupPageCreation } from 'src/app/shared/validationSchemas/yup-page-creation';
import { UtilService } from "../../../shared/util.service";
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-page-creation',
  templateUrl: './page-creation.component.html',
  styleUrls: ['./page-creation.component.scss']
})
export class PageCreationComponent {
  PageCreationDialog: boolean = false;

  valCheck: string[] = [];

  countries: any[] = [];

  cities: any[];

  filteredCountries: any[] = [];

  ngApplicationName: any;
  ngModuleName: any;
  ngSubModuleName: any;
  ngPageName: string = '';
  ngPageURL: string = '';
  ngMainPageName:string='';
  ngOrderBy:string='';
  ngIconStyle:string='';
  ngIsSubMenu:boolean=false;
  ingredient:string='';
  
  fieldTextType: boolean = false;
  submitted: boolean = false;
  imageSrc: any;
  PageCreationInfoForm: FormGroup<YupFormControls<IPageCreation>>;


  initialValues: IPageCreation = {
    ApplicationName: '',
    ModuleName: '',
    SubModuleName: '',
    PageName: '',
    PageURL:'',
    MainPageName:'',
    OrderBy:'',
    IconStyle:'',
    IsSubMenu1:false,
    IsSubMenu2:false,
  }

  validationSchema: yup.ObjectSchema<IPageCreation> = YupPageCreation.PAGECREATION_INFO;

  formError = (controlName: string, formName: any) => {
    return this.UtilService.formError(controlName, formName);
  };

  public isAgreement: boolean = false;
  public deleteProductDialog: boolean = false;

  public Locations: any[] = [];

  constructor(private countryService: CountryService, private UtilService: UtilService) {

    this.PageCreationInfoForm = FormHandler.controls<IPageCreation>(this.initialValues);
    this.PageCreationInfoForm.setValidators(
      FormHandler.validate<IPageCreation>(this.validationSchema)
    );

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.toggleFieldTextType();
  }

  ngOnInit() {
    this.countryService.getCountries().then(countries => {
      this.countries = countries;
    });
  }
  openNew() {
    this.submitted = false;
    this.PageCreationDialog = true;
  }
  deleteSelectedProducts() {
    this.deleteProductDialog = true;
  }
  confirmDelete() {
    this.deleteProductDialog = false;
  }
  hideDialog() {
    this.PageCreationDialog = false;
    this.submitted = false;
  }
  saveProduct() {
    this.submitted = true;
  }

  searchCountry(event: any) {
    // in a real application, make a request to a remote url with the query and
    // return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    const query = event.query;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  saveUsers() {
    this.submitted = true;
  }
  onSubmitPageCreationInfo() {

  }
}

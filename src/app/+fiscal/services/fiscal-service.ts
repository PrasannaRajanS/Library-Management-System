import { Injectable } from '@angular/core';
import { APIConfig } from 'src/app/config/api.config';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { FiscalAPIConfig } from './fiscal-api-config';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class FiscalService {

  private baseAPIURL: string = '';
  private getEdit:string = '';

  constructor(private commonHttpService: CommonHttpService,private _httpClient: HttpClient,private spinner: NgxSpinnerService) {
    this.baseAPIURL = APIConfig.API_BASE_URL;
    this.getEdit = this.baseAPIURL + FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.EDIT;
  }


  //#region  INSTITUION 
  public getInstituionsData(): Promise<any> {
    // this.spinner.show();
    return this.commonHttpService.globalGetWithOutParamaterService(this.baseAPIURL + FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.DATA).then((res: any) => {
      // this.spinner.hide();
      return res;
    });
  }

  public GetInstitutionById(data: any): Promise<any> {
    // this.spinner.show();
    return this.commonHttpService.globalllGetService(this.getEdit, data).then((res: any) => {
      // this.spinner.hide();
      return res;
    });
  }  
  //#endregion


  async fetchInstitutionsData(): Promise<any> {
    try {
      // this.spinner.show();
      const response = await this._httpClient.get<any>(this.baseAPIURL + FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.DATA).toPromise();
      // this.spinner.hide();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async fetchInstitutionById(id:any): Promise<any> {
    try {
      // this.spinner.show();
      const response = await this._httpClient.get<any>(this.baseAPIURL + FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.EDIT + "?institutionId=" + id).toPromise();
      // this.spinner.hide();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

}

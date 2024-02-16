import { Injectable } from '@angular/core';
import { APIConfig } from 'src/app/config/api.config';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { FiscalAPIConfig } from './fiscal-api-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiscalService {

  private baseAPIURL: string = '';
  private getEdit: string = '';

  constructor(private commonHttpService: CommonHttpService,
    private _httpClient: HttpClient) {
    this.baseAPIURL = APIConfig.API_BASE_URL;
    this.getEdit = this.baseAPIURL + FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.EDIT;
  }


  //#region  INSTITUION 
  public getInstituionsData(): Promise<any> {
    return this.commonHttpService.globalGetWithOutParamaterService(this.baseAPIURL + FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.DATA).then((res: any) => {
      return res;
    });
  }

  public GetInstitutionById(data: any): Promise<any> {
    return this.commonHttpService.globalllGetService(this.getEdit, data).then((res: any) => {
      return res;
    });
  }
  //#endregion


  async fetchInstitutionsData(): Promise<any> {
    try {
      const response = await this._httpClient.get<any>(this.baseAPIURL + FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.DATA).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async fetchInstitutionById(id: any): Promise<any> {
    try {
      const response = await this._httpClient.get<any>(this.baseAPIURL + FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.EDIT + "?institutionId=" + id).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async fetchCountries(): Promise<any> {
    try {
      const response = await this._httpClient.get<any>(this.baseAPIURL + APIConfig.API_CONFIG.API_URL.COMMON.GET_COUNTRIES).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }


  async fetchStates(): Promise<any> {
    try {
      const response = await this._httpClient.get<any>(this.baseAPIURL + APIConfig.API_CONFIG.API_URL.COMMON.GET_STATES).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

}

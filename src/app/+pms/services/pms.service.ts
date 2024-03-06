import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConfig } from 'src/app/config/api.config';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { ICountry } from 'src/app/shared/interface/ICountry';
import { PMSAPIConfig } from './pms-api-config';

@Injectable({
  providedIn: 'root'
})
export class PmsService {

  private baseAPIURL: string = '';
  constructor(private commonHttpService: CommonHttpService,) { 
    this.baseAPIURL = APIConfig.API_BASE_URL;
  }

  public getEmployeesData(): Promise<any> {
    return this.commonHttpService.globalGetWithOutParamaterService(this.baseAPIURL + PMSAPIConfig.API_CONFIG.API_URL.MASTER.EMPLOYEE.DATA).then((res: any) => {
      return res;
    });
  }
 
}

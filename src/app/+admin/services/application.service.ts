import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommonHttpService } from 'src/app/shared-services/common-http.service';
import { AdminAPIConfig } from './admin-api-config';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpService: CommonHttpService) {}

  public SaveApplication(data: any) {
    return this.httpService.globalPostService(
      AdminAPIConfig.ADMIN_API_BASE_URL + AdminAPIConfig.API_CONFIG.API_URL.ADMIN.APPLICATION.SAVE,
      data
    ).pipe(map(data => data));
  };
}

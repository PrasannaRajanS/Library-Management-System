import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { AdminAPIConfig } from './admin-api-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseAPIURL: string = "";
  constructor(private _httpClient: HttpClient) {
    this.baseAPIURL = AdminAPIConfig.ADMIN_API_BASE_URL;
  }

  globalPost(url: string, data: any): any {

    let config = {};
    const headers = { 'content-type': 'application/json' }
    config = { headers: new HttpHeaders(headers) };

    return this._httpClient.post<any>(this.baseAPIURL + url, data, config).pipe(retry(1), catchError(this.handleError));
  }

  globalGet(url: string): any {

    let config = {};
    const headers = { 'content-type': 'application/json' }
    config = { headers: new HttpHeaders(headers) };

    console.log('globalGet', this.baseAPIURL + url)
    return this._httpClient.get<any>(this.baseAPIURL + url, config).pipe(map(data => data));

  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}

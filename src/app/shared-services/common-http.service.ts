import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIConfig } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  private baseAPIURL: string = "";
  constructor(private _httpClient: HttpClient) {
    this.baseAPIURL = APIConfig.API_BASE_URL;
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

  // #region Error handling
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
  // #endregion



  public globalPostService(url: string, data: any): any {
    return this._httpClient.post(url, data).toPromise().catch(e => {
      console.log("error happend", e);
      if (e.status == 401) {
        console.log(e.statusText);
      }
    });
  }

  public globalGetWithOutParamaterService(url: string): any {
    return this._httpClient.get<any>(url).toPromise();
  }

  public globalllGetService(url: string, data: any): any {
    const params = new HttpParams({ fromObject: data });
    let querystring = "?" + params;
    return this._httpClient.get(url + querystring).toPromise().
      catch(e => {
        console.log("error happend", e);
      });
  }

  public globalGetServiceByUrl(url: string, data: any) {
    return this._httpClient.get(url + data).toPromise().
      catch(e => {
        console.log("error Shappend", e);
      });
  }

}

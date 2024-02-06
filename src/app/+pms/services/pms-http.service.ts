import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Any other use can i delete it
import { PMSAPIConfig } from './pms-api-config';
import { catchError, retry, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIConfig } from 'src/app/config/api.config';


@Injectable({
  providedIn: 'root'
})
export class PMSHttpService {

  private baseAPIURL: string = "";


  constructor( private _httpClient:HttpClient) { 
      this.baseAPIURL = APIConfig.API_BASE_URL;
    
    }

    globalPost( url:string,data:any):any{
        let config = {};
        const headers ={'content-type': 'application/json'}
        config ={headers:new HttpHeaders(headers)};

        return this._httpClient.post<any>(this.baseAPIURL + url , data, config).pipe(retry(1),catchError(this.handleError))
    }
    globalGet(url:string):any{
        let config={};
        const headers ={'content-type':'application/json' }
        config={headers:new HttpHeaders(headers)}
        console.log('globalGet', this.baseAPIURL+url);

        return this._httpClient.get<any>(this.baseAPIURL + url, config).pipe(map(data =>data))
  
        
    }

    // Error handling

    handleError(error:any){
      let errorMessage = '';
      if(error.error instanceof ErrorEvent){

          // Get client-side error
        errorMessage = error.error.message;
      }
      else{
          // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage:${error.message}`
      }
      window.alert(errorMessage);
      return throwError(()=>{
        return errorMessage;
      })
    }
}

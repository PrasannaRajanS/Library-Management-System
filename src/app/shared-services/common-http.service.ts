import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonHttpService {


    constructor(private http: HttpClient) { }


    public globalGetService(url: string, data: any) {

        try {

            let config = {};
            const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
            
            config = {
                headers: new HttpHeaders(headers),
                withCredentials: true
            }

            var querystring ="";//  "?" + $.param(data);
            return this.http.get<any>(url + querystring, config).pipe(map(data => data));
        }
        catch (e) {
            return e;
        }
    }

    
    public globalGetWithOutParamaterService(url: string) {
        return this.http.get<any>(url).pipe(map(data => data));
    }


    public globalPostService(url: string, data: any) {
        return this.http.post<any>(url, data).pipe(retry(1), catchError(this.handleError));
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

import { throwError as observableThrowError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http, Headers, Response, ResponseContentType } from '@angular/';

import * as $ from 'jquery';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { NavigationStart , Router,ActivatedRoute} from '@angular/router';

import { AppConstant } from '../app.constant';

import * as _ from 'lodash';
@Injectable()
export class CommonHttpService {
  constructor(private http: HttpClient,private router:Router) { }
  public globalPostService(url: string, data: any) {
// this.FindPage();
    return this.http.post(url, data).toPromise().catch(e => {
      console.log("error happend", e);
      if (e.status == 401) {
        console.log(e.statusText);
        // window.location.href = "../../access.html";
      }
    });

  }
  public globalGetService(url: string, data: any) {
   // this.FindPage();
    var querystring = "?" + $.param(data);
    var urlstring = url + querystring;
    return this.http.get(urlstring).toPromise().
      catch(e => {
        console.log("error happend", e);
      });
  }
  public globalDeleteService(url: string, data: any) {
    var querystring = "?" + $.param(data);
    return this.http.delete(url + querystring).toPromise().
      catch(e => {
        console.log("error happend", e);
      });
  }

  public globalGetServiceByUrl(url: string, data: any) {
    return this.http.get(url + data).toPromise().
      catch(e => {
        console.log("error Shappend", e);
      });
  }
  public globalPostStreamService(url: string, data: any, header:any) {
    //   let headers = new HttpHeaders();
    // headers = headers.append('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(url, data, header).toPromise().catch(e => {
      console.log("error happend", e);
      if (e.status == 401) {
        console.log(e.statusText);
        // window.location.href = "../../access.html";
      }
    });

  }
  downloadfile(url:string, data:any) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.responseType = 'blob';
    xhr.send(JSON.stringify(data));
    xhr.onload = function (e) {
      console.log("downloaded file", e);
      // if (this.status == 200) {
      //  console.log("downloaded file",this.response);
      // } else {
      //   //deal with your error state here
      // }
    };
  }

  // HttpBlobPostService(url: string, data: any) {
  //   return this.http.post(url, data, { responseType: 'blob' })
  //     .pipe(map(this.extractData))
  //     .pipe(catchError(this.handleError));
  // }
  private extractData(res: Response) {
    // let body = res.json();
    return res || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      errMsg="Download  Failed .";
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
  
    return throwError(errMsg);

  }

  public Googledata(id:string) {
    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
    return this.http.get(url).toPromise().
      catch(e => {
        console.log("error Shappend", e);
      });
  }

  public javaapiGet(url:string) {
    return this.http.get(url).toPromise().
      catch(e => {
        console.log('error Shappend ', e);
      });
  }

  public javaapiPost(url:string) {
    return this.http.post(url, '').toPromise().
      catch(e => {
        console.log('error Shappend ', e);
      });
  }

}

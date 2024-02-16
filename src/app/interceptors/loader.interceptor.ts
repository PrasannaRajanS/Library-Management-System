import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../layout/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {


  noLoaderAPIs = ['/Fiscal/Organization/GetCountries']
  isLoaderNeeded: boolean | undefined;
  activeRequests: number = 0;
  constructor(private _loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (this._loaderNeeded(request.url)) {
      if (this.activeRequests === 0) {
        this._loaderService.startLoading();
      }

      this.activeRequests++;
      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this._loaderService.stopLoading();
          }
        })
      );
    }
    return next.handle(request);
  }


  private _loaderNeeded(requestURL: string) {
    this.isLoaderNeeded = true;

    let params = new URLSearchParams(location.search);
    // Something

    this.noLoaderAPIs.forEach(item => {
      if (requestURL.indexOf(item) != -1) {
        this.isLoaderNeeded = false;
      }
    });
    return this.isLoaderNeeded;
  }

}

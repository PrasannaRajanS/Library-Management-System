import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from '../shared/interface/ICountry';
import { IState } from '../shared/interface/IState';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public getCountries(): Promise<any> {
    return this.http.get<any>('assets/demo/data/countries.json').toPromise().then((res: any) => {
      return res.countries as ICountry[];
    });
  }

  getStates() {
    return this.http.get<any>('assets/demo/data/state.json').toPromise()
      .then(res => res.states as IState[])
      .then(data => data);
  }
  
}

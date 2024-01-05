import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
import { CommonHttpService } from "../../shared/common-http.service";
import { AppSettings } from "../../config/app.settings";
//import { AppConstant } from "../../config/app.contant";
//import { TrimSetting } from "../trims/trims.setting";
// import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root',
})
export class PageService {

    private MainUrl: string;
    private DropdownListApiUrl: string;
    private LoadGridDataApiUrl: string;

    constructor(private http: HttpClient, private _httpService: CommonHttpService,
        // private spinner: NgxSpinnerService
        ) {

        this.MainUrl = AppSettings.API_BASE;
        this.DropdownListApiUrl = this.MainUrl + 'api/controller/DropdownList';
        this.LoadGridDataApiUrl = this.MainUrl + 'api/controller/LoadGridData';
    }

    public DropdownList(data: any): Promise<any> {
        // this.spinner.show();
        return this._httpService.globalGetService(this.DropdownListApiUrl, data).then(res => {
            // this.spinner.hide();
            return res;
        })
    }
    
    public LoadGridData(data: any): Promise<any> {
        // this.spinner.show();
        return this._httpService.globalGetService(this.LoadGridDataApiUrl, data).then(res => {
            // this.spinner.hide();
            return res;
        })
    }
}

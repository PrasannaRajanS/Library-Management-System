import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  loaderSubscription: Subscription | undefined;

  constructor(private loaderService: LoaderService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loaderSubscription = this.loaderService.currentLoadingStatus.subscribe((value) => {
      if (value == true) {
        this.spinner.show();
      }
      else {
        this.spinner.hide();
      }
    });

  }


  ngOnDestroy() {
    this.loaderSubscription?.unsubscribe();
  }
}

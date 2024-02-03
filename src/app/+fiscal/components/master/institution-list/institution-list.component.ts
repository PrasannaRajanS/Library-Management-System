import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/+admin/services/http.service';
import { ProductService } from 'src/app/demo/service/product.service';

import { FiscalAPIConfig } from 'src/app/+fiscal/services/fiscal-api-config';
import { IInstitution } from 'src/app/+fiscal/services/interfaces/IInstitution';

import { Table } from 'primeng/table';


@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent {

  cols: any[] = [];
  public userDetails: any;
  //selectedItems: IInstitution[] = [];
  public item: IInstitution = {};
  items: IInstitution[] = [];

  deleteDialog: boolean = false;
  ApplicationCreationForm: any;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private productService: ProductService
  ) {

  }

  ngOnInit() {
    this.GetAll();
  }

  public GetAll() {
    this.productService.getInstitution().then((data) => {
      this.items = data
    })
    // try {
    //   this.httpService.globalGet(FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.LIST)
    //   .subscribe({
    //     next: (result:any) =>{
    //       this.items = result.pages;
    //       console.log('GetAll',this.items);

    //     },
    //     error:(err: HttpErrorResponse)=> console.log(err)

    //   })
    // } catch (error) {

    // }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  Edit(item: any) {
    console.log('Edit', item.institutionId);

    this.router.navigate(['/apps/fiscal/institution/', item.institutionId]);
  }

  Delete(data: any) {
    this.deleteDialog = true;
    this.item = { ...data };
  }

  confirmDelete() {
    this.deleteDialog = false;
    let deletedItem: any[] = this.items.filter((val) => val.institutionId === this.item.institutionId);

    console.log('deletedItem', deletedItem);

    if (deletedItem != null && deletedItem.length > 0) {
      var passSaveParams: any = {};

      passSaveParams.institutionId = deletedItem[0].institutionId
      passSaveParams.isActive = false;
      passSaveParams.userId = this.userDetails ? this.userDetails.userId : 0;
      passSaveParams.ipAddress = '192.168.1.1';

      this.httpService.globalPost(
        FiscalAPIConfig.API_CONFIG.API_URL.MASTER.Institution.DELETE,
        JSON.stringify(passSaveParams)
      )
        .subscribe({
          next: (result: any) => {

          },
          error: (err: HttpErrorResponse) => console.log(err),

        })
    }

    this.item = {};

  }
  AddPage() {
    this.router.navigate(['/apps/fiscal/institution'])
  }
}

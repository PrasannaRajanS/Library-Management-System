import { Component } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Application } from '../../api/application';
import { ApplicationService } from '../../services/application.service';


@Component({
    selector: 'app-application-creation',
    templateUrl: './application-creation.component.html',
    styleUrls: ['./application-creation.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ApplicationCreationComponent {

    applicationDialog: boolean = false;
    deleteApplicationDialog: boolean = false;
    deleteApplicationsDialog: boolean = false;

    applications: Application[] = [];
    application: Application = {};
    selectedApplications: Application[] = [];

    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private applicationService : ApplicationService
    ) {

    }

    ngOnInit() {
        
        this.productService.getProducts().then(data => this.applications = data);

        this.cols = [
            { field: 'applicationName', header: 'Application Name' },
            { field: 'description', header: 'Description' },
        ];


    }

    openNew() {
        this.application = {};
        this.submitted = false;
        this.applicationDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteApplicationsDialog = true;
    }

    Edit(product: Product) {
        this.application = { ...product };
        this.applicationDialog = true;
    }

    Delete(product: Product) {
        this.deleteApplicationDialog = true;
        this.application = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteApplicationsDialog = false;
        this.applications = this.applications.filter(val => !this.selectedApplications.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Application Deleted', life: 3000 });
        this.selectedApplications = [];
    }

    confirmDelete() {
        this.deleteApplicationDialog = false;
        this.applications = this.applications.filter(val => val.applicationId !== this.application.applicationId);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Application Deleted', life: 3000 });
        this.application = {};
    }

    hideDialog() {
        this.applicationDialog = false;
        this.submitted = false;
    }

    Save() {
        this.submitted = true;

        if (this.application.applicationName?.trim()) {
            if (this.application.applicationId) {
                
                // @ts-ignore
                
                this.applications[this.findIndexById(this.application.applicationId)] = this.application;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Application Updated', life: 3000 });

            } else {
                this.application.applicationId = 0;

                // @ts-ignore
                this.applications.push(this.application);
                console.log(this.applications);

                let PassParams: any = {};

                this.applicationService.SaveApplication(PassParams).subscribe(res => {
                    
                });
                
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Application Created', life: 3000 });
            }

            this.applications = [...this.applications];
            this.applicationDialog = false;
            this.application = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.applications.length; i++) {
            if (this.applications[i].applicationId === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}

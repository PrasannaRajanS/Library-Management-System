import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAcademicYear } from 'src/app/+fiscal/services/interfaces/IAcademicYear';
import { IOrganization } from 'src/app/+fiscal/services/interfaces/IOrganization';

import { Product } from 'src/app/demo/api/product';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersLarge() {
        return this.http.get<any>('assets/demo/data/products-orders.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getAcademicYears() {
        return this.http.get<any>('assets/demo/data/academic-years.json')
            .toPromise()
            .then(res => res.data as IAcademicYear[])
            .then(data => data);
    }
    getOrganization() {
        return this.http.get<any>('assets/demo/data/organization.json')
            .toPromise()
            .then(res => res.data as IOrganization[])
            .then(data => data);
    }
}

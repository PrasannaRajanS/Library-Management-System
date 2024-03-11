import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { IEmployee } from 'src/app/+pms/services/interfaces/IEmployee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

    // for table data :
    employeeList:IEmployee[]=[];
    cols: any[] = [];
    selectedItems:IEmployee[]=[]

    deleteDialog:boolean=false;
    item:any;
  
  
    constructor(){
  
    }

    onGlobalFilter(table:Table,event:Event){

    }

    Edit(data:any){

    }

    Delete(data:any){

    }

    confirmDelete(){

    }
}

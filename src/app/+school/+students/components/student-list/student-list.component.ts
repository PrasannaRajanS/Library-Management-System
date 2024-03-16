import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { IStudent } from 'src/app/+school/services/interfaces/IStudent';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  cols: any[] = [];

  selectedItems: IStudent[] = [];
  item: IStudent = {};
  items: IStudent[] = [];

  deleteDialog: boolean = false;

  constructor(
    private router: Router,
  ) {

  }

  AddPage() {
    this.router.navigate(['/apps/students/student-add']);
  }

  onGlobalFilter(table: Table, event: Event) {

  }

  Edit(item: any) {

  }

  Delete(data: any) {

  }

  confirmDelete(){

  }
}

import { Component, ViewChild } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Route, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  listEmployees!: any[];
  // form!: FormGroup;

  employeeList: any = [];
  editMode: boolean = false;
  id!: string;
  @ViewChild('employeeEditForm') form: NgForm | undefined;

  constructor(
    private apicalservice: ApiServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchEmployee();
  }

  fetchEmployee() {
    this.apicalservice.getEmployee().subscribe((data: any) => {
      this.listEmployees = data;
      console.log('Data requested ...');
      console.log(this.listEmployees);

      //Populate the employee list from array with objects
      for (let i = 0; i < this.listEmployees.length; i++) {
        this.employeeList.push({
          id: this.listEmployees[i].id,
          name: this.listEmployees[i].name,
          username: this.listEmployees[i].username,
          street: this.listEmployees[i].address.street,
          suite: this.listEmployees[i].address.suite,
          zipcode: this.listEmployees[i].address.zipcode,
        });
      }
    });
  }

  onCompleteEmployee(id: string) {
    let currentEmployee = this.employeeList.find((e: { id: string }) => {
      return e.id === id;
    });
    console.log(currentEmployee);

    this.form?.setValue({
      name: currentEmployee.name ?? null,
      username: currentEmployee.username ?? null,
      street: currentEmployee.street ?? null,
      suite: currentEmployee.suite ?? null,
      zipcode: currentEmployee.zipcode ?? null,
    });
  }

  onEditEmployee(id: string) {
    this.apicalservice.updateEmployee(this.id, this.form?.value).pipe(first()).subscribe((data: any) => {
      console.log(data);
      this.reloadRoute();
    }
    );
  }

  onDeleteEmployee(id: string) {
    this.apicalservice.deleteEmployee(id).subscribe((data: any) => {
      console.log(data);
      this.reloadRoute();
    });
  }

  reloadRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}

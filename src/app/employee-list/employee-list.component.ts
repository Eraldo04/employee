import { Component, ViewChild } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  listEmployees!: any[];
  employeeList:any = [];
  editMode: boolean = false;
  @ViewChild('employeeEditForm') form: NgForm | undefined;

  constructor(private apicalservice: ApiServiceService) {

  }    

  ngOnInit() {
    this.fetchEmployee();
  }

  fetchEmployee(){
    return this.apicalservice.getEmployee().subscribe((data) => {
       this.listEmployees = data;
       console.log('list of employees', this.listEmployees);
       
        for (let employee of this.employeeList) {
        const objAddress = JSON.stringify(this.employeeList)
         this.employeeList.push({
           id: employee.id,
           name: employee.name,
           username: employee.username,
          //  street: objAddress.address["street"],
           suite: employee.address["suite"],
          zipcode: employee.address["zipcode"],
        })
       }
  });
}

onCompleteEmployee(id: string){
  // Get the list of employee by id
  let currentEmployee = this.employeeList.find((e: { id: string; }) => {return e.id === id});
  console.log(currentEmployee);

  //Populate the form with the specified employee
  this.form?.setValue({
    name: currentEmployee.name ?? null,
    username: currentEmployee.username ?? null,
    street: currentEmployee.street ?? null,
    suite: currentEmployee.suite ?? null,
    zipcode: currentEmployee.zipcode ?? null, 
  });

  //Change the employee by the button name

}

onEditEmployee(id: string){
  let currentEmployee = this.employeeList.find((e: { id: string; }) => {return e.id === id});

  return this.apicalservice.updateEmployee(id, currentEmployee).subscribe((data: any) => {
    console.log("updated employee: " + JSON.stringify(currentEmployee));
  })
}

onDeleteEmployee(id: string){ {
  let currentEmployee = this.employeeList.find((e: { id: string; }) => {return e.id === id});
  return this.apicalservice.deleteEmployee(id).subscribe((data: any) => {
    console.log("Delete employee successfully");
    console.log(currentEmployee);

  })
}

}
}

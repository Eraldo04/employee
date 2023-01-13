import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent {
  constructor(private apicalservice: ApiServiceService) {

  } 
  ngOnInit() {
  }


  onEmployeeCreate(employees:{name: string, username: string, street: string, suite: string, zipcode: string}) {
    return this.apicalservice.postEmployee().subscribe((data: any) => {
      console.log("posted employee: " + JSON.stringify(employees));
  
  });
  }
}

import { DatatableComponent } from './datatable/datatable.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'addEmployee', component: DepartmentListComponent,},
  { path: 'employees', component: EmployeeListComponent,},
  { path: ' ', component: EmployeeListComponent,},
  { path: 'users', component: DatatableComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DepartmentListComponent, EmployeeListComponent]
 

import { Component } from '@angular/core';
import { EmployeeList } from './features/employees/components/employee-list/employee-list';
import { EmployeeForm } from './features/employees/components/employee-form/employee-form';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeForm, EmployeeList],
  templateUrl: './app.html',
})
export class App {}
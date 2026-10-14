import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { EmployeeActions } from '../../store/employee.actions';
import {
  selectAllEmployees,
  selectEmployeesLoading,
  selectEmployeesError
} from '../../store/employee.selectors';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {
  private readonly store = inject(Store);

  readonly employees = this.store.selectSignal(selectAllEmployees);
  readonly loading = this.store.selectSignal(selectEmployeesLoading);
  readonly error = this.store.selectSignal(selectEmployeesError);

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }
}
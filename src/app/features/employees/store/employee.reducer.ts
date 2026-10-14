import { createReducer, on } from '@ngrx/store';
import {
  createEntityAdapter,
  EntityAdapter,
  EntityState
} from '@ngrx/entity';

import { Employee } from '../models/employee.model';
import { EmployeeActions } from './employee.actions';

export const employeeFeatureKey = 'employees';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  adding: boolean;
  error: string | null;
}

export const employeeAdapter: EntityAdapter<Employee> =
  createEntityAdapter<Employee>();

export const initialState: EmployeeState =
  employeeAdapter.getInitialState({
    loading: false,
    adding: false,
    error: null
  });

export const employeeReducer = createReducer(
  initialState,

  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
    adding: false,
    error: null
  })),

  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) =>
    employeeAdapter.setAll(employees, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    adding: false,
    error
  })),
 on(EmployeeActions.addEmployee, (state) => ({
  ...state,
  adding: true,
  error: null
})),

on(EmployeeActions.addEmployeeSuccess, (state, { employee }) =>
  employeeAdapter.addOne(employee, {
    ...state,
    adding: false,
    error: null
  })
),

on(EmployeeActions.addEmployeeFailure, (state, { error }) => ({
  ...state,
  adding: false,
  error
}))
);
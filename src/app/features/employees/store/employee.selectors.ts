import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  EmployeeState,
  employeeFeatureKey,
  employeeAdapter
} from './employee.reducer';

// Select the entire Employees state
export const selectEmployeeState =
  createFeatureSelector<EmployeeState>(employeeFeatureKey);

// Entity Adapter selectors
const { selectAll } = employeeAdapter.getSelectors();

// Select all employees
export const selectAllEmployees = createSelector(
  selectEmployeeState,
  selectAll
);

// Select loading state
export const selectEmployeesLoading = createSelector(
  selectEmployeeState,
  state => state.loading
);

// Select error state
export const selectEmployeesError = createSelector(
  selectEmployeeState,
  state => state.error
);

export const selectEmployeesAdding = createSelector(
  selectEmployeeState,
  (state) => state.adding
);
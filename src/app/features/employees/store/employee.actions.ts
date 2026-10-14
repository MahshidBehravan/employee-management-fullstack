import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Employee } from '../models/employee.model';

export const EmployeeActions = createActionGroup({
  source: 'Employees',
  events: {
    'Load Employees': emptyProps(),
    'Load Employees Success': props<{ employees: Employee[] }>(),
    'Load Employees Failure': props<{ error: string }>(),
    'Add Employee': props<{employee: Omit<Employee, 'id'>}>(),
    'Add Employee Success': props<{ employee: Employee}>(),
    'Add Employee Failure': props<{error: string}>(),
    
  },
  
});

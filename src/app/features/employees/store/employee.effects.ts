import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError,exhaustMap,map, of,switchMap} from 'rxjs';

import { EmployeeService } from '../data-access/employee-api.service';
import { EmployeeActions } from './employee.actions';

@Injectable()
export class EmployeeEffects {
 private readonly actions$ = inject(Actions);
  private readonly employeeService = inject(EmployeeService);

  readonly loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),

      switchMap(() =>
        this.employeeService.getEmployees().pipe(
          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),

          catchError((error) =>
            of(
              EmployeeActions.loadEmployeesFailure({
                error: error.message ?? 'Failed to load employees'
              })
            )
          )
        )
      )
    )
  );
  readonly addEmployee$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmployeeActions.addEmployee),

    exhaustMap(({ employee }) =>
      this.employeeService.addEmployee(employee).pipe(
        map((createdEmployee) =>
          EmployeeActions.addEmployeeSuccess({
            employee: createdEmployee
          })
        ),

        catchError((error) =>
          of(
            EmployeeActions.addEmployeeFailure({
              error: error.message ?? 'Failed to add employee'
            })
          )
        )
      )
    )
  )
);
}




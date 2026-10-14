import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EmployeeActions } from '../../store/employee.actions';
import { selectEmployeesAdding } from '../../store/employee.selectors';

import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  readonly adding = this.store.selectSignal(selectEmployeesAdding);

  private readonly actions$ = inject(Actions);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    salary: [0, [Validators.required, Validators.min(1)]]
  });

  constructor() {
  this.actions$
    .pipe(
      ofType(EmployeeActions.addEmployeeSuccess),
      takeUntilDestroyed()
    )
    .subscribe(() => {
      this.form.reset();
    });
}
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      EmployeeActions.addEmployee({
        employee: this.form.getRawValue()
      })
    );
  }
}



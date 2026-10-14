import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  employeeFeatureKey,
  employeeReducer
} from './features/employees/store/employee.reducer';

import { EmployeeEffects } from './features/employees/store/employee.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    
provideStore({
  [employeeFeatureKey]: employeeReducer
}),

  provideEffects(EmployeeEffects),

  ...(isDevMode()
    ? [provideStoreDevtools({ maxAge: 25 })]
    : [])
  ]
};

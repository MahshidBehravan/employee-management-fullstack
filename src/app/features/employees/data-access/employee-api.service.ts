import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Service()
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    'http://localhost:5023/api/employees';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
  return this.http.post<Employee>(this.apiUrl, employee);
}


}

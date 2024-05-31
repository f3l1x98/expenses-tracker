import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../shared/api/base-api.service';
import { CreateExpenseRequest } from '../interfaces/create-expense-request.interface';
import { Observable } from 'rxjs';
import { Expense } from '../interfaces/expense.interface';
import { UpdateExpenseRequest } from '../interfaces/update-expense-request.interface';

@Injectable({ providedIn: 'root' })
export class ExpensesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/expenses`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: CreateExpenseRequest): Observable<Expense> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(request: UpdateExpenseRequest): Observable<Expense> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(): Observable<Expense[]> {
    return this.apiService.get(this.getAllUrl);
  }
}

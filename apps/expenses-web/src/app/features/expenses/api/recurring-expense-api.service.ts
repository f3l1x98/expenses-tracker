import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import { CreateRecurringExpenseRequest } from './interfaces/requests/create-recurring-expense-request.interface';
import { UpdateRecurringExpenseRequest } from './interfaces/requests/update-recurring-expense-request.interface';
import { IRecurringExpense } from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class RecurringExpensesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/recurring-expenses`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(
    request: CreateRecurringExpenseRequest,
  ): Observable<IRecurringExpense> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(
    request: UpdateRecurringExpenseRequest,
  ): Observable<IRecurringExpense> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(): Observable<IRecurringExpense[]> {
    return this.apiService.get(this.getAllUrl);
  }

  delete$(id: string): Observable<void> {
    return this.apiService.delete(`${this.baseUrl}/${id}`);
  }
}

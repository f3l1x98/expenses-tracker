import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import { CreateRecurringExpenseRequest } from '../../interfaces/api/create-recurring-expense-request.interface';
import { UpdateRecurringExpenseRequest } from '../../interfaces/api/update-recurring-expense-request.interface';
import { RecurringExpense } from '../../interfaces/recurring-expense.interface';

@Injectable({ providedIn: 'root' })
export class RecurringExpensesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/recurring-expenses`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(
    request: CreateRecurringExpenseRequest
  ): Observable<RecurringExpense> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(
    request: UpdateRecurringExpenseRequest
  ): Observable<RecurringExpense> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(): Observable<RecurringExpense[]> {
    return this.apiService.get(this.getAllUrl);
  }
}

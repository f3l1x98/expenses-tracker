import { Injectable, inject } from '@angular/core';
import {
  BaseApiService,
  RequestParams,
} from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import {
  ICreateRecurringExpenseDto,
  IRecurringExpense,
  IRecurringExpenseFilterDto,
  IUpdateRecurringExpenseDto,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class RecurringExpensesApiService {
  #apiService = inject(BaseApiService);

  private readonly baseUrl: string = `${this.#apiService.apiRoot}/recurring-expenses`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: ICreateRecurringExpenseDto): Observable<IRecurringExpense> {
    return this.#apiService.post(this.createUrl, request);
  }

  update$(
    id: string,
    request: IUpdateRecurringExpenseDto,
  ): Observable<IRecurringExpense> {
    return this.#apiService.put(`${this.baseUrl}/${id}`, request);
  }

  getAll$(
    filter?: IRecurringExpenseFilterDto,
  ): Observable<IRecurringExpense[]> {
    return this.#apiService.get(
      this.getAllUrl,
      filter as unknown as RequestParams,
    );
  }

  delete$(id: string): Observable<void> {
    return this.#apiService.delete(`${this.baseUrl}/${id}`);
  }
}

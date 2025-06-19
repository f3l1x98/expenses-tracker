import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BaseApiService,
  RequestParams,
} from '../../../shared/api/base-api.service';
import {
  ICreateRecurringIncomeDto,
  IRecurringIncome,
  IRecurringIncomeFilterDto,
  IUpdateRecurringIncomeDto,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class RecurringIncomesApiService {
  #apiService = inject(BaseApiService);

  private readonly baseUrl: string = `${this.#apiService.apiRoot}/recurring-incomes`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: ICreateRecurringIncomeDto): Observable<IRecurringIncome> {
    return this.#apiService.post(this.createUrl, request);
  }

  update$(
    id: string,
    request: IUpdateRecurringIncomeDto,
  ): Observable<IRecurringIncome> {
    return this.#apiService.put(`${this.baseUrl}/${id}`, request);
  }

  getAll$(filter?: IRecurringIncomeFilterDto): Observable<IRecurringIncome[]> {
    return this.#apiService.get(
      this.getAllUrl,
      filter as unknown as RequestParams,
    );
  }

  delete$(id: string): Observable<void> {
    return this.#apiService.delete(`${this.baseUrl}/${id}`);
  }
}

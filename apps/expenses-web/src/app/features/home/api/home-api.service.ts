import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../shared/api/base-api.service';
import {
  CurrentMonthDataDto,
  ExpensesPerCategoryResponse,
  ExpensesPerMonthResponse,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class HomeApiService {
  #apiService = inject(BaseApiService);

  private readonly baseUrl: string = `${this.#apiService.apiRoot}/dashboards`;
  private readonly getCurrentMonthDataUrl: string = `${this.baseUrl}/current-month`;
  private readonly getExpensesPerCategoryUrl: string = `${this.baseUrl}/expenses-per-category`;
  private readonly getExpensesPerMonthUrl: string = `${this.baseUrl}/expenses-per-month`;

  getCurrentMonthData$(): Observable<CurrentMonthDataDto> {
    return this.#apiService.get(this.getCurrentMonthDataUrl);
  }

  getExpensesPerCategory$(
    startDate: Date,
    endDate: Date | undefined,
  ): Observable<ExpensesPerCategoryResponse> {
    return this.#apiService.get(this.getExpensesPerCategoryUrl, {
      startDate: startDate.toISOString(),
      endDate: (endDate ?? new Date()).toISOString(),
    });
  }

  getExpensesPerMonth$(
    startDate: Date,
    endDate: Date | undefined,
  ): Observable<ExpensesPerMonthResponse> {
    return this.#apiService.get(this.getExpensesPerMonthUrl, {
      startDate: startDate.toISOString(),
      endDate: (endDate ?? new Date()).toISOString(),
    });
  }
}

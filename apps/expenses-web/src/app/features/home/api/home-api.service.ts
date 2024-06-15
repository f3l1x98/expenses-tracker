import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { CurrentMonthData } from './interfaces/current-month-data.interface';
import { ExpensesPerCategoryResponse } from './interfaces/expenses-per-catergory-response.interface';
import { ExpensesPerMonthResponse } from './interfaces/expenses-per-month-response.interface';

@Injectable({ providedIn: 'root' })
export class HomeApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/dashboards`;
  private readonly getCurrentMonthDataUrl: string = `${this.baseUrl}/current-month`;
  private readonly getExpensesPerCategoryUrl: string = `${this.baseUrl}/expenses-per-category`;
  private readonly getExpensesPerMonthUrl: string = `${this.baseUrl}/expenses-per-month`;

  getCurrentMonthData$(): Observable<CurrentMonthData> {
    return this.apiService.get(this.getCurrentMonthDataUrl);
  }

  getExpensesPerCategory$(
    startDate: Date,
    endDate: Date | null,
  ): Observable<ExpensesPerCategoryResponse> {
    return this.apiService.get(this.getExpensesPerCategoryUrl, {
      startDate: startDate.toISOString(),
      endDate: (endDate ?? new Date()).toISOString(),
    });
  }

  getExpensesPerMonth$(
    startDate: Date,
    endDate: Date | null,
  ): Observable<ExpensesPerMonthResponse> {
    return this.apiService.get(this.getExpensesPerMonthUrl, {
      startDate: startDate.toISOString(),
      endDate: (endDate ?? new Date()).toISOString(),
    });
  }
}

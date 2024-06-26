import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../shared/api/base-api.service';
import {
  ICreateRecurringIncomeDto,
  IRecurringIncome,
  IUpdateRecurringIncomeDto,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class RecurringIncomesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/recurring-incomes`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: ICreateRecurringIncomeDto): Observable<IRecurringIncome> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(request: IUpdateRecurringIncomeDto): Observable<IRecurringIncome> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(): Observable<IRecurringIncome[]> {
    return this.apiService.get(this.getAllUrl);
  }

  delete$(id: string): Observable<void> {
    return this.apiService.delete(`${this.baseUrl}/${id}`);
  }
}

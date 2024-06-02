import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../../../shared/api/base-api.service';
import { CreateRecurringIncomeRequest } from '../../interfaces/api/create-recurring-income-request.interface';
import { UpdateRecurringIncomeRequest } from '../../interfaces/api/update-recurring-income-request.interface';
import { RecurringIncome } from '../../interfaces/recurring-income.interface';

@Injectable({ providedIn: 'root' })
export class RecurringIncomesApiService {
  constructor(private apiService: BaseApiService) {}

  private readonly baseUrl: string = `${this.apiService.apiRoot}/recurring-incomes`;
  private readonly createUrl: string = `${this.baseUrl}/`;
  private readonly updateUrl: string = `${this.baseUrl}/`;
  private readonly getAllUrl: string = `${this.baseUrl}/`;

  create$(request: CreateRecurringIncomeRequest): Observable<RecurringIncome> {
    return this.apiService.post(this.createUrl, request);
  }

  update$(request: UpdateRecurringIncomeRequest): Observable<RecurringIncome> {
    return this.apiService.put(this.updateUrl, request);
  }

  getAll$(): Observable<RecurringIncome[]> {
    return this.apiService.get(this.getAllUrl);
  }
}

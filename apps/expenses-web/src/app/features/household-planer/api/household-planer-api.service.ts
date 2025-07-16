import { inject, Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import {
  IHouseholdExpenseResponse,
  IHouseholdIncomeResponse,
  IHouseholdOverview,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class HouseholdPlanerApiService {
  #apiService = inject(BaseApiService);

  private readonly baseUrl: string = `${this.#apiService.apiRoot}/householdPlaner`;
  private readonly expensesUrl: string = `${this.baseUrl}/expenses`;
  private readonly incomesUrl: string = `${this.baseUrl}/incomes`;
  private readonly overviewUrl: string = `${this.baseUrl}/overview`;

  getHouseholdExpenses$(): Observable<IHouseholdExpenseResponse> {
    return this.#apiService.get(this.expensesUrl);
  }
  getHouseholdIncomes$(): Observable<IHouseholdIncomeResponse> {
    return this.#apiService.get(this.incomesUrl);
  }

  getHouseholdOverview$(): Observable<IHouseholdOverview> {
    return this.#apiService.get(this.overviewUrl);
  }
}

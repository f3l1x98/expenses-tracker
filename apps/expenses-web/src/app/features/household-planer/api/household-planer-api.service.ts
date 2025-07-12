import { inject, Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import {
  IHouseholdExpensePerCategoryResponse,
  IHouseholdExpenseResponse,
  IHouseholdIncomePerCategoryResponse,
  IHouseholdIncomeResponse,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class HouseholdPlanerApiService {
  #apiService = inject(BaseApiService);

  private readonly baseUrl: string = `${this.#apiService.apiRoot}/householdPlaner`;
  private readonly expensesUrl: string = `${this.baseUrl}/expenses`;
  private readonly incomesUrl: string = `${this.baseUrl}/incomes`;
  private readonly expensesOverviewUrl: string = `${this.baseUrl}/expenses/overview`;
  private readonly incomesOverviewUrl: string = `${this.baseUrl}/incomes/overview`;

  getHouseholdExpenses$(): Observable<IHouseholdExpenseResponse> {
    return this.#apiService.get(this.expensesUrl);
  }
  getHouseholdIncomes$(): Observable<IHouseholdIncomeResponse> {
    return this.#apiService.get(this.incomesUrl);
  }

  getHouseholdExpensesOverview$(): Observable<IHouseholdExpensePerCategoryResponse> {
    return this.#apiService.get(this.expensesOverviewUrl);
  }
  getHouseholdIncomesOverview$(): Observable<IHouseholdIncomePerCategoryResponse> {
    return this.#apiService.get(this.incomesOverviewUrl);
  }
}

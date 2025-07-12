import { inject, Injectable } from '@angular/core';
import { BaseApiService } from '../../../shared/api/base-api.service';
import { Observable } from 'rxjs';
import { IHouseholdExpense, IHouseholdIncome } from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class HouseholdPlanerApiService {
  #apiService = inject(BaseApiService);

  private readonly baseUrl: string = `${this.#apiService.apiRoot}/householdPlaner`;
  private readonly expensesUrl: string = `${this.baseUrl}/expenses`;
  private readonly incomesUrl: string = `${this.baseUrl}/incomes`;

  getHouseholdExpenses$(): Observable<IHouseholdExpense[]> {
    return this.#apiService.get(this.expensesUrl);
  }
  getHouseholdIncomes$(): Observable<IHouseholdIncome[]> {
    return this.#apiService.get(this.incomesUrl);
  }
}

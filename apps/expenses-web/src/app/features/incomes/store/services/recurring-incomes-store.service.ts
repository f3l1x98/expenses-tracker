import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ApiActions from '../actions/recurring-incomes-api.actions';
import * as PageActions from '../actions/recurring-incomes-page.actions';
import { recurringIncomesFeature } from '../features/recurring-incomes.feature';
import {
  ICreateRecurringIncomeDto,
  IRecurringIncomeFilterDto,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class RecurringIncomesStoreService {
  loadStatus$ = this.store.select(recurringIncomesFeature.selectLoadStatus);
  recurringIncomes$ = this.store.select(
    recurringIncomesFeature.selectRecurringIncomes,
  );
  createStatus$ = this.store.select(recurringIncomesFeature.selectCreateStatus);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }

  updateFilter(filter: IRecurringIncomeFilterDto) {
    this.store.dispatch(PageActions.updateFilter({ filter }));
  }

  create(request: ICreateRecurringIncomeDto) {
    this.store.dispatch(PageActions.createRequest({ request }));
  }

  delete(id: string) {
    this.store.dispatch(PageActions.deleteRequest({ id }));
  }
}

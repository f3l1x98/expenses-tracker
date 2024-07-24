import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { recurringExpensesFeature } from '../features/recurring-expenses.feature';
import * as ApiActions from '../actions/recurring-expenses-api.actions';
import * as PageActions from '../actions/recurring-expenses-page.actions';
import {
  ICreateRecurringExpenseDto,
  IRecurringExpenseFilterDto,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class RecurringExpensesStoreService {
  loadStatus$ = this.store.select(recurringExpensesFeature.selectLoadStatus);
  recurringExpenses$ = this.store.select(
    recurringExpensesFeature.selectRecurringExpenses,
  );
  createStatus$ = this.store.select(
    recurringExpensesFeature.selectCreateStatus,
  );

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }

  updateFilter(filter: IRecurringExpenseFilterDto) {
    this.store.dispatch(PageActions.updateFilter({ filter }));
  }

  create(request: ICreateRecurringExpenseDto) {
    this.store.dispatch(PageActions.createRequest({ request }));
  }

  delete(id: string) {
    this.store.dispatch(PageActions.deleteRequest({ id }));
  }
}

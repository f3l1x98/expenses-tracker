import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { recurringExpensesFeature } from '../features/recurring-expenses.feature';
import * as ApiActions from '../actions/recurring-expenses-api.actions';

@Injectable({ providedIn: 'root' })
export class RecurringExpensesStoreService {
  status$ = this.store.select(recurringExpensesFeature.selectStatus);
  recurringExpenses$ = this.store.select(
    recurringExpensesFeature.selectRecurringExpenses
  );

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }
}

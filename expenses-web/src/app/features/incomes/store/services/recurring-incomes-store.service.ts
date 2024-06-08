import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ApiActions from '../actions/recurring-incomes-api.actions';
import { recurringIncomesFeature } from '../features/recurring-incomes.feature';

@Injectable({ providedIn: 'root' })
export class RecurringIncomesStoreService {
  loadStatus$ = this.store.select(recurringIncomesFeature.selectLoadStatus);
  recurringIncomes$ = this.store.select(
    recurringIncomesFeature.selectRecurringIncomes
  );
  createStatus$ = this.store.select(recurringIncomesFeature.selectCreateStatus);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ApiActions from '../actions/recurring-incomes-api.actions';
import { recurringIncomesFeature } from '../features/recurring-incomes.feature';

@Injectable({ providedIn: 'root' })
export class RecurringIncomesStoreService {
  status$ = this.store.select(recurringIncomesFeature.selectStatus);
  recurringIncomes$ = this.store.select(
    recurringIncomesFeature.selectRecurringIncomes
  );

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }
}

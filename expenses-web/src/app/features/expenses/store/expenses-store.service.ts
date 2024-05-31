import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { expensesFeature } from './expenses.feature';
import * as ApiActions from './expenses-api.actions';

@Injectable({ providedIn: 'root' })
export class ExpensesStoreService {
  status$ = this.store.select(expensesFeature.selectStatus);
  expenses$ = this.store.select(expensesFeature.selectExpenses);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }
}

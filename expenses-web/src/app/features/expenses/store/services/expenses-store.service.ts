import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { expensesFeature } from '../features/expenses.feature';
import * as ApiActions from '../actions/expenses-api.actions';
import * as UserActions from '../actions/expenses-user.actions';
import { CreateExpenseRequest } from '../../api/interfaces/requests/create-expense-request.interface';

@Injectable({ providedIn: 'root' })
export class ExpensesStoreService {
  loadStatus$ = this.store.select(expensesFeature.selectLoadStatus);
  expenses$ = this.store.select(expensesFeature.selectExpenses);
  createStatus$ = this.store.select(expensesFeature.selectCreateStatus);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }

  create(request: CreateExpenseRequest) {
    this.store.dispatch(UserActions.createRequest({ request }));
  }
}

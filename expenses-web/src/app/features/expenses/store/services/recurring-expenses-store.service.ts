import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { recurringExpensesFeature } from '../features/recurring-expenses.feature';
import * as ApiActions from '../actions/recurring-expenses-api.actions';
import * as UserActions from '../actions/recurring-expenses-user.actions';
import { CreateRecurringExpenseRequest } from '../../api/interfaces/requests/create-recurring-expense-request.interface';

@Injectable({ providedIn: 'root' })
export class RecurringExpensesStoreService {
  loadStatus$ = this.store.select(recurringExpensesFeature.selectLoadStatus);
  recurringExpenses$ = this.store.select(
    recurringExpensesFeature.selectRecurringExpenses
  );
  createStatus$ = this.store.select(
    recurringExpensesFeature.selectCreateStatus
  );

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }

  create(request: CreateRecurringExpenseRequest) {
    this.store.dispatch(UserActions.createRequest({ request }));
  }
}

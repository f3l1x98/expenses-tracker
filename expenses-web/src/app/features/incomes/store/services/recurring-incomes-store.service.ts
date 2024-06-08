import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ApiActions from '../actions/recurring-incomes-api.actions';
import * as UserActions from '../actions/recurring-incomes-user.actions';
import { recurringIncomesFeature } from '../features/recurring-incomes.feature';
import { CreateRecurringIncomeRequest } from '../../api/interfaces/requests/create-recurring-income-request.interface';

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

  create(request: CreateRecurringIncomeRequest) {
    this.store.dispatch(UserActions.createRequest({ request }));
  }

  delete(id: string) {
    this.store.dispatch(UserActions.deleteRequest({ id }));
  }
}

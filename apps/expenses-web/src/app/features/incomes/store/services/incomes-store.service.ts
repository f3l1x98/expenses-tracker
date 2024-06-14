import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { incomesFeature } from '../features/incomes.feature';
import * as ApiActions from '../actions/incomes-api.actions';
import * as PageActions from '../actions/incomes-page.actions';
import { CreateIncomeRequest } from '../../api/interfaces/requests/create-income-request.interface';

@Injectable({ providedIn: 'root' })
export class IncomesStoreService {
  loadStatus$ = this.store.select(incomesFeature.selectLoadStatus);
  incomes$ = this.store.select(incomesFeature.selectIncomes);
  createStatus$ = this.store.select(incomesFeature.selectCreateStatus);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }

  create(request: CreateIncomeRequest) {
    this.store.dispatch(PageActions.createRequest({ request }));
  }

  delete(id: string) {
    this.store.dispatch(PageActions.deleteRequest({ id }));
  }
}
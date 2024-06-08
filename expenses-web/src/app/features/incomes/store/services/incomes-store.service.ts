import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { incomesFeature } from '../features/incomes.feature';
import * as ApiActions from '../actions/incomes-api.actions';

@Injectable({ providedIn: 'root' })
export class IncomesStoreService {
  loadStatus$ = this.store.select(incomesFeature.selectLoadStatus);
  incomes$ = this.store.select(incomesFeature.selectIncomes);
  createStatus$ = this.store.select(incomesFeature.selectCreateStatus);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }
}

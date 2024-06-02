import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { incomesFeature } from '../features/incomes.feature';
import * as ApiActions from '../actions/incomes-api.actions';

@Injectable({ providedIn: 'root' })
export class IncomesStoreService {
  status$ = this.store.select(incomesFeature.selectStatus);
  incomes$ = this.store.select(incomesFeature.selectIncomes);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }
}

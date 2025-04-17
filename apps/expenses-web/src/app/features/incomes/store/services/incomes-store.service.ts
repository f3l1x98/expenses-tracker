import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { incomesFeature } from '../features/incomes.feature';
import * as ApiActions from '../actions/incomes-api.actions';
import * as PageActions from '../actions/incomes-page.actions';
import { ICreateIncomeDto, IIncomeFilterDto } from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class IncomesStoreService {
  #store = inject(Store);

  loadStatus$ = this.#store.select(incomesFeature.selectLoadStatus);
  incomes$ = this.#store.select(incomesFeature.selectIncomes);
  createStatus$ = this.#store.select(incomesFeature.selectCreateStatus);

  load() {
    this.#store.dispatch(ApiActions.loadStart());
  }

  updateFilter(filter: IIncomeFilterDto) {
    this.#store.dispatch(PageActions.updateFilter({ filter }));
  }

  create(request: ICreateIncomeDto) {
    this.#store.dispatch(PageActions.createRequest({ request }));
  }

  delete(id: string) {
    this.#store.dispatch(PageActions.deleteRequest({ id }));
  }
}

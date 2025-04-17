import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { expensesFeature } from '../features/expenses.feature';
import * as ApiActions from '../actions/expenses-api.actions';
import * as PageActions from '../actions/expenses-page.actions';
import {
  ICreateExpenseDto,
  IExpenseFilterDto,
  IUpdateExpenseDto,
} from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class ExpensesStoreService {
  #store = inject(Store);

  loadStatus$ = this.#store.select(expensesFeature.selectLoadStatus);
  expenses$ = this.#store.select(expensesFeature.selectExpenses);
  createStatus$ = this.#store.select(expensesFeature.selectCreateStatus);
  updateStatus$ = this.#store.select(expensesFeature.selectUpdateStatus);

  toggleIsEdit(id: string) {
    this.#store.dispatch(PageActions.toggleIsEdit({ id }));
  }

  load() {
    this.#store.dispatch(ApiActions.loadStart());
  }

  updateFilter(filter: IExpenseFilterDto) {
    this.#store.dispatch(PageActions.updateFilter({ filter }));
  }

  create(request: ICreateExpenseDto) {
    this.#store.dispatch(PageActions.createRequest({ request }));
  }

  update(id: string, request: IUpdateExpenseDto) {
    this.#store.dispatch(PageActions.updateRequest({ id, request }));
  }

  delete(id: string) {
    this.#store.dispatch(PageActions.deleteRequest({ id }));
  }
}

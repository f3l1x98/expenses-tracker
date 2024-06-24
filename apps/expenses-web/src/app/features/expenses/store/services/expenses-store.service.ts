import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { expensesFeature } from '../features/expenses.feature';
import * as ApiActions from '../actions/expenses-api.actions';
import * as PageActions from '../actions/expenses-page.actions';
import { ICreateExpenseDto, IExpenseFilterDto } from 'expenses-shared';

@Injectable({ providedIn: 'root' })
export class ExpensesStoreService {
  loadStatus$ = this.store.select(expensesFeature.selectLoadStatus);
  expenses$ = this.store.select(expensesFeature.selectExpenses);
  createStatus$ = this.store.select(expensesFeature.selectCreateStatus);

  constructor(private store: Store) {}

  load() {
    this.store.dispatch(ApiActions.loadStart());
  }

  updateFilter(filter: IExpenseFilterDto) {
    this.store.dispatch(PageActions.updateFilter({ filter }));
  }

  create(request: ICreateExpenseDto) {
    this.store.dispatch(PageActions.createRequest({ request }));
  }

  delete(id: string) {
    this.store.dispatch(PageActions.deleteRequest({ id }));
  }
}

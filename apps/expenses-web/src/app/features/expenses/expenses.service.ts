import { Injectable, inject } from '@angular/core';
import { ExpensesStoreService } from './store/services/expenses-store.service';
import {
  ICreateExpenseDto,
  IExpenseFilterDto,
  IUpdateExpenseDto,
} from 'expenses-shared';

@Injectable()
export class ExpensesService {
  #store = inject(ExpensesStoreService);

  loadStatus$ = this.#store.loadStatus$;
  expenses$ = this.#store.expenses$;
  createStatus$ = this.#store.createStatus$;
  updateStatus$ = this.#store.updateStatus$;

  load() {
    this.#store.load();
  }

  toggleIsEdit(id: string) {
    this.#store.toggleIsEdit(id);
  }

  updateFilter(filter: IExpenseFilterDto) {
    this.#store.updateFilter(filter);
  }

  create(request: ICreateExpenseDto) {
    this.#store.create(request);
  }

  update(id: string, request: IUpdateExpenseDto) {
    this.#store.update(id, request);
  }

  delete(id: string) {
    this.#store.delete(id);
  }
}

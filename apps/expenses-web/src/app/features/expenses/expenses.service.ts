import { Injectable } from '@angular/core';
import { ExpensesStoreService } from './store/services/expenses-store.service';
import { ICreateExpenseDto, IExpenseFilterDto } from 'expenses-shared';

@Injectable()
export class ExpensesService {
  loadStatus$ = this.store.loadStatus$;
  expenses$ = this.store.expenses$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: ExpensesStoreService) {}

  load() {
    this.store.load();
  }

  updateFilter(filter: IExpenseFilterDto) {
    this.store.updateFilter(filter);
  }

  create(request: ICreateExpenseDto) {
    this.store.create(request);
  }

  delete(id: string) {
    this.store.delete(id);
  }
}

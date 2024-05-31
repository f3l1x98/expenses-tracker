import { Injectable } from '@angular/core';
import { ExpensesStoreService } from './store/expenses-store.service';

@Injectable()
export class ExpensesService {
  status$ = this.store.status$;
  expenses$ = this.store.expenses$;

  constructor(private store: ExpensesStoreService) {}

  load() {
    this.store.load();
  }
}

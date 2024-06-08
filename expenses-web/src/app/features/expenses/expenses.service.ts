import { Injectable } from '@angular/core';
import { ExpensesStoreService } from './store/services/expenses-store.service';
import { CreateExpenseRequest } from './api/interfaces/requests/create-expense-request.interface';

@Injectable()
export class ExpensesService {
  loadStatus$ = this.store.loadStatus$;
  expenses$ = this.store.expenses$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: ExpensesStoreService) {}

  load() {
    this.store.load();
  }

  create(request: CreateExpenseRequest) {
    this.store.create(request);
  }

  delete(id: string) {
    this.store.delete(id);
  }
}

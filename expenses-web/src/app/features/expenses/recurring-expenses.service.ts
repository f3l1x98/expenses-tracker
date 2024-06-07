import { Injectable } from '@angular/core';
import { RecurringExpensesStoreService } from './store/services/recurring-expenses-store.service';
import { CreateRecurringExpenseRequest } from './api/interfaces/requests/create-recurring-expense-request.interface';

@Injectable()
export class RecurringExpensesService {
  loadStatus$ = this.store.loadStatus$;
  recurringExpenses$ = this.store.recurringExpenses$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: RecurringExpensesStoreService) {}

  load() {
    this.store.load();
  }

  create(request: CreateRecurringExpenseRequest) {
    this.store.create(request);
  }
}

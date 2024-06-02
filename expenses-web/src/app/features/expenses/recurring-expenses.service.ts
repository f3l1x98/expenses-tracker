import { Injectable } from '@angular/core';
import { RecurringExpensesStoreService } from './store/services/recurring-expenses-store.service';

@Injectable()
export class RecurringExpensesService {
  status$ = this.store.status$;
  recurringExpenses$ = this.store.recurringExpenses$;

  constructor(private store: RecurringExpensesStoreService) {}

  load() {
    this.store.load();
  }
}

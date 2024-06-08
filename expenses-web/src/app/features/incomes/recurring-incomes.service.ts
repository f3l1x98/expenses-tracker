import { Injectable } from '@angular/core';
import { RecurringIncomesStoreService } from './store/services/recurring-incomes-store.service';

@Injectable()
export class RecurringIncomesService {
  loadStatus$ = this.store.loadStatus$;
  recurringIncomes$ = this.store.recurringIncomes$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: RecurringIncomesStoreService) {}

  load() {
    this.store.load();
  }
}

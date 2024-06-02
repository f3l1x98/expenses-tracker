import { Injectable } from '@angular/core';
import { RecurringIncomesStoreService } from './store/services/recurring-incomes-store.service';

@Injectable()
export class RecurringIncomesService {
  status$ = this.store.status$;
  recurringIncomes$ = this.store.recurringIncomes$;

  constructor(private store: RecurringIncomesStoreService) {}

  load() {
    this.store.load();
  }
}

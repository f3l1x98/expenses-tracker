import { Injectable } from '@angular/core';
import { RecurringIncomesStoreService } from './store/services/recurring-incomes-store.service';
import { CreateRecurringIncomeRequest } from './api/interfaces/requests/create-recurring-income-request.interface';

@Injectable()
export class RecurringIncomesService {
  loadStatus$ = this.store.loadStatus$;
  recurringIncomes$ = this.store.recurringIncomes$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: RecurringIncomesStoreService) {}

  load() {
    this.store.load();
  }

  create(request: CreateRecurringIncomeRequest) {
    this.store.create(request);
  }
}

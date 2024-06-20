import { Injectable } from '@angular/core';
import { RecurringIncomesStoreService } from './store/services/recurring-incomes-store.service';
import { ICreateRecurringIncomeDto } from 'expenses-shared';

@Injectable()
export class RecurringIncomesService {
  loadStatus$ = this.store.loadStatus$;
  recurringIncomes$ = this.store.recurringIncomes$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: RecurringIncomesStoreService) {}

  load() {
    this.store.load();
  }

  create(request: ICreateRecurringIncomeDto) {
    this.store.create(request);
  }

  delete(id: string) {
    this.store.delete(id);
  }
}

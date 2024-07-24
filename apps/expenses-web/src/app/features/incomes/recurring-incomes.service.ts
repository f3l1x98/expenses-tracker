import { Injectable } from '@angular/core';
import { RecurringIncomesStoreService } from './store/services/recurring-incomes-store.service';
import {
  ICreateRecurringIncomeDto,
  IRecurringIncomeFilterDto,
} from 'expenses-shared';

@Injectable()
export class RecurringIncomesService {
  loadStatus$ = this.store.loadStatus$;
  recurringIncomes$ = this.store.recurringIncomes$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: RecurringIncomesStoreService) {}

  load() {
    this.store.load();
  }

  updateFilter(filter: IRecurringIncomeFilterDto) {
    this.store.updateFilter(filter);
  }

  create(request: ICreateRecurringIncomeDto) {
    this.store.create(request);
  }

  delete(id: string) {
    this.store.delete(id);
  }
}

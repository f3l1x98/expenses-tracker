import { Injectable, inject } from '@angular/core';
import { RecurringExpensesStoreService } from './store/services/recurring-expenses-store.service';
import {
  ICreateRecurringExpenseDto,
  IRecurringExpenseFilterDto,
} from 'expenses-shared';

@Injectable()
export class RecurringExpensesService {
  #store = inject(RecurringExpensesStoreService);

  loadStatus$ = this.#store.loadStatus$;
  recurringExpenses$ = this.#store.recurringExpenses$;
  createStatus$ = this.#store.createStatus$;

  load() {
    this.#store.load();
  }

  updateFilter(filter: IRecurringExpenseFilterDto) {
    this.#store.updateFilter(filter);
  }

  create(request: ICreateRecurringExpenseDto) {
    this.#store.create(request);
  }

  delete(id: string) {
    this.#store.delete(id);
  }
}

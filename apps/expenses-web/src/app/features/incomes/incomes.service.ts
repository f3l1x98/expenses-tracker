import { Injectable, inject } from '@angular/core';
import { IncomesStoreService } from './store/services/incomes-store.service';
import { ICreateIncomeDto, IIncomeFilterDto } from 'expenses-shared';

@Injectable()
export class IncomesService {
  #store = inject(IncomesStoreService);

  loadStatus$ = this.#store.loadStatus$;
  incomes$ = this.#store.incomes$;
  createStatus$ = this.#store.createStatus$;

  load() {
    this.#store.load();
  }

  updateFilter(filter: IIncomeFilterDto) {
    this.#store.updateFilter(filter);
  }

  create(request: ICreateIncomeDto) {
    this.#store.create(request);
  }

  delete(id: string) {
    this.#store.delete(id);
  }
}

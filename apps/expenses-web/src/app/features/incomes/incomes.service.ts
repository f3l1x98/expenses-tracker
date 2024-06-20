import { Injectable } from '@angular/core';
import { IncomesStoreService } from './store/services/incomes-store.service';
import { ICreateIncomeDto } from 'expenses-shared';

@Injectable()
export class IncomesService {
  loadStatus$ = this.store.loadStatus$;
  incomes$ = this.store.incomes$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: IncomesStoreService) {}

  load() {
    this.store.load();
  }

  create(request: ICreateIncomeDto) {
    this.store.create(request);
  }

  delete(id: string) {
    this.store.delete(id);
  }
}

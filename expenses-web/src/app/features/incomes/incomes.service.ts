import { Injectable } from '@angular/core';
import { IncomesStoreService } from './store/services/incomes-store.service';
import { CreateIncomeRequest } from './api/interfaces/requests/create-income-request.interface';

@Injectable()
export class IncomesService {
  loadStatus$ = this.store.loadStatus$;
  incomes$ = this.store.incomes$;
  createStatus$ = this.store.createStatus$;

  constructor(private store: IncomesStoreService) {}

  load() {
    this.store.load();
  }

  create(request: CreateIncomeRequest) {
    this.store.create(request);
  }
}

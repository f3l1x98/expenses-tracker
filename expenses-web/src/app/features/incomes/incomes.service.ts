import { Injectable } from '@angular/core';
import { IncomesStoreService } from './store/services/incomes-store.service';

@Injectable()
export class IncomesService {
  status$ = this.store.status$;
  incomes$ = this.store.incomes$;

  constructor(private store: IncomesStoreService) {}

  load() {
    this.store.load();
  }
}

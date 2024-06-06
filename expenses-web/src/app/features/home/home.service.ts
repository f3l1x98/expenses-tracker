import { Injectable } from '@angular/core';
import { HomeStoreService } from './store/services/home-store.service';
import { DateRange } from './store/interfaces/date-range.interface';

@Injectable()
export class HomeService {
  status$ = this.homeStoreService.status$;
  filter$ = this.homeStoreService.filter$;
  expensesPerMonth$ = this.homeStoreService.expensesPerMonth$;
  expensesPerCategory$ = this.homeStoreService.expensesPerCategory$;
  currentMonthData$ = this.homeStoreService.currentMonthData$;

  constructor(private homeStoreService: HomeStoreService) {}

  setDateRangeFilter(dateRange: DateRange) {
    this.homeStoreService.setDateRangeFilter(dateRange);
  }
}

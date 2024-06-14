import { Injectable } from '@angular/core';
import { HomeStoreService } from './store/services/home-store.service';
import { DateRange } from '../../shared/interfaces/date-range.interface';

@Injectable()
export class HomeService {
  filter$ = this.homeStoreService.filter$;
  expensesPerMonth$ = this.homeStoreService.expensesPerMonth$;
  expensesPerCategory$ = this.homeStoreService.expensesPerCategory$;
  currentMonthData$ = this.homeStoreService.currentMonthData$;

  constructor(private homeStoreService: HomeStoreService) {}

  public enterPage() {
    this.homeStoreService.enterPage();
  }

  setDateRangeFilter(dateRange: DateRange) {
    this.homeStoreService.setDateRangeFilter(dateRange);
  }
}

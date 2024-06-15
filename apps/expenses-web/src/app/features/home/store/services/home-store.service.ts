import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { homeFeature } from '../features/home.feature';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';
import * as PageActions from '../actions/home-page.actions';

@Injectable({ providedIn: 'root' })
export class HomeStoreService {
  filter$ = this.store.select(homeFeature.selectFilter);
  currentMonthData$ = this.store.select(homeFeature.selectCurrentMonthDataData);
  currentMonthDataStatus$ = this.store.select(
    homeFeature.selectCurrentMonthDataStatus,
  );
  expensesPerCategory$ = this.store.select(
    homeFeature.selectExpensesPerCategoryData,
  );
  expensesPerCategoryStatus$ = this.store.select(
    homeFeature.selectExpensesPerCategoryStatus,
  );
  expensesPerMonth$ = this.store.select(homeFeature.selectExpensesPerMonthData);
  expensesPerMonthStatus$ = this.store.select(
    homeFeature.selectExpensesPerMonthStatus,
  );

  constructor(private store: Store) {}

  public enterPage() {
    this.store.dispatch(PageActions.enterPage());
  }

  public setDateRangeFilter(dateRange: DateRange) {
    this.store.dispatch(PageActions.setDateRangeFilter({ filter: dateRange }));
  }
}

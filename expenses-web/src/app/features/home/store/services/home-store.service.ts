import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { homeFeature } from '../features/home.feature';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';
import * as UserActions from '../actions/home-user.actions';

@Injectable({ providedIn: 'root' })
export class HomeStoreService {
  filter$ = this.store.select(homeFeature.selectFilter);
  currentMonthData$ = this.store.select(homeFeature.selectCurrentMonthDataData);
  currentMonthDataStatus$ = this.store.select(
    homeFeature.selectCurrentMonthDataStatus
  );
  expensesPerCategory$ = this.store.select(
    homeFeature.selectExpensesPerCategoryData
  );
  expensesPerCategoryStatus$ = this.store.select(
    homeFeature.selectExpensesPerCategoryStatus
  );
  expensesPerMonth$ = this.store.select(homeFeature.selectExpensesPerMonthData);
  expensesPerMonthStatus$ = this.store.select(
    homeFeature.selectExpensesPerMonthStatus
  );

  constructor(private store: Store) {}

  public setDateRangeFilter(dateRange: DateRange) {
    this.store.dispatch(UserActions.setDateRangeFilter({ filter: dateRange }));
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { homeFeature } from '../features/home.feature';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';
import * as UserActions from '../actions/home-user.actions';

@Injectable({ providedIn: 'root' })
export class HomeStoreService {
  status$ = this.store.select(homeFeature.selectStatus);
  filter$ = this.store.select(homeFeature.selectFilter);
  expensesPerMonth$ = this.store.select(homeFeature.selectExpensesPerMonth);
  expensesPerCategory$ = this.store.select(
    homeFeature.selectExpensesPerCategory
  );
  currentMonthData$ = this.store.select(homeFeature.selectCurrentMonthData);

  constructor(private store: Store) {}

  public setDateRangeFilter(dateRange: DateRange) {
    this.store.dispatch(UserActions.setDateRangeFilter({ filter: dateRange }));
  }
}

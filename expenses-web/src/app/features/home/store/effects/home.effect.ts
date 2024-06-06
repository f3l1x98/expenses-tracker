import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeApiService } from '../../api/home-api.service';
import * as ApiActions from '../actions/home-api.actions';
import * as UserActions from '../actions/home-user.actions';
import { catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { HomeLoadSuccessResult } from '../actions/home-api.actions';

@Injectable()
export class HomeEffect {
  constructor(
    private actions$: Actions,
    private homeApiService: HomeApiService
  ) {}

  setFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.setDateRangeFilter),
      switchMap((action) => of(ApiActions.loadStart({ filter: action.filter })))
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loadStart),
      switchMap((action) =>
        combineLatest(
          [
            this.homeApiService.getCurrentMonthData$(),
            this.homeApiService.getExpensesPerCategory$(
              action.filter.startDate,
              action.filter.endDate
            ),
            this.homeApiService.getExpensesPerMonth$(
              action.filter.startDate,
              action.filter.endDate
            ),
          ],
          (
            currentMonthData,
            expensesPerCategory,
            expensesPerMonth
          ): HomeLoadSuccessResult => ({
            currentMonthData: currentMonthData,
            expensesPerCategory: expensesPerCategory,
            expensesPerMonth: expensesPerMonth,
          })
        ).pipe(
          map((result) => ApiActions.loadSuccess({ result })),
          catchError((error) => of(ApiActions.loadFailure(error)))
        )
      )
    )
  );
}

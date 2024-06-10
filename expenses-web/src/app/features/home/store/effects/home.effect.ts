import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeApiService } from '../../api/home-api.service';
import * as ApiActions from '../actions/home-api.actions';
import * as PageActions from '../actions/home-page.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class HomeEffect {
  constructor(
    private actions$: Actions,
    private homeApiService: HomeApiService
  ) {}

  enterPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.enterPage),
      switchMap((action) => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return of(
          PageActions.setDateRangeFilter({
            filter: { startDate: startOfMonth, endDate: null },
          }),
          ApiActions.currentMonthDataLoadStart()
        );
      })
    )
  );

  setFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.setDateRangeFilter),
      switchMap((action) =>
        of(
          ApiActions.expensesPerCategoryLoadStart({ filter: action.filter }),
          ApiActions.expensesPerMonthLoadStart({ filter: action.filter })
        )
      )
    )
  );

  loadCurrentMonthData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.currentMonthDataLoadStart),
      switchMap((action) =>
        this.homeApiService.getCurrentMonthData$().pipe(
          map((result) => ApiActions.currentMonthDataLoadSuccess({ result })),
          catchError((error) =>
            of(ApiActions.currentMonthDataLoadFailure(error))
          )
        )
      )
    )
  );

  loadExpensesPerCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.expensesPerCategoryLoadStart),
      switchMap((action) =>
        this.homeApiService
          .getExpensesPerCategory$(
            action.filter.startDate,
            action.filter.endDate
          )
          .pipe(
            map((result) =>
              ApiActions.expensesPerCategoryLoadSuccess({ result })
            ),
            catchError((error) =>
              of(ApiActions.expensesPerCategoryLoadFailure(error))
            )
          )
      )
    )
  );

  loadExpensesPerMonth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.expensesPerMonthLoadStart),
      switchMap((action) =>
        this.homeApiService
          .getExpensesPerMonth$(action.filter.startDate, action.filter.endDate)
          .pipe(
            map((result) => ApiActions.expensesPerMonthLoadSuccess({ result })),
            catchError((error) =>
              of(ApiActions.expensesPerMonthLoadFailure(error))
            )
          )
      )
    )
  );
}

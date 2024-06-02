import { Injectable } from '@angular/core';
import { RecurringExpensesApiService } from '../services/api/recurring-expense-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ApiActions from '../actions/recurring-expenses-api.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class RecurringExpensesEffect {
  constructor(
    private actions$: Actions,
    private apiService: RecurringExpensesApiService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loadStart),
      switchMap((action) =>
        this.apiService.getAll$().pipe(
          map((result) => ApiActions.loadSuccess({ result })),
          catchError((error) => of(ApiActions.loadFailure({ error })))
        )
      )
    )
  );
}

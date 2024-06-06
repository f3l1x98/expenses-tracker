import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ApiActions from '../actions/recurring-incomes-api.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecurringIncomesApiService } from '../../api/recurring-incomes-api.service';

@Injectable()
export class RecurringIncomesEffect {
  constructor(
    private actions$: Actions,
    private apiService: RecurringIncomesApiService
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

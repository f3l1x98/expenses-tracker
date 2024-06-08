import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ApiActions from '../actions/recurring-incomes-api.actions';
import * as UserActions from '../actions/recurring-incomes-user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecurringIncomesApiService } from '../../api/recurring-incomes-api.service';

@Injectable()
export class RecurringIncomesEffect {
  constructor(
    private actions$: Actions,
    private apiService: RecurringIncomesApiService
  ) {}

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createRequest),
      switchMap((action) =>
        of(ApiActions.createStart({ request: action.request }))
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.createStart),
      switchMap((action) =>
        this.apiService.create$(action.request).pipe(
          switchMap((result) =>
            of(ApiActions.createSuccess({ result }), ApiActions.loadStart())
          ),
          catchError((error) => of(ApiActions.createFailure(error)))
        )
      )
    )
  );

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

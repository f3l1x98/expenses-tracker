import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpensesApiService } from '../../api/expenses-api.service';
import * as ApiActions from '../actions/expenses-api.actions';
import * as UserActions from '../actions/expenses-user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class ExpensesEffect {
  constructor(
    private actions$: Actions,
    private apiService: ExpensesApiService
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
          map((result) => ApiActions.createSuccess()),
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

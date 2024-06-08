import { Injectable } from '@angular/core';
import { RecurringExpensesApiService } from '../../api/recurring-expense-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ApiActions from '../actions/recurring-expenses-api.actions';
import * as UserActions from '../actions/recurring-expenses-user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class RecurringExpensesEffect {
  constructor(
    private actions$: Actions,
    private apiService: RecurringExpensesApiService
  ) {}

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteRequest),
      switchMap((action) => of(ApiActions.deleteStart({ id: action.id })))
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.deleteStart),
      switchMap((action) =>
        this.apiService.delete$(action.id).pipe(
          switchMap((result) =>
            of(ApiActions.deleteSuccess(), ApiActions.loadStart())
          ),
          catchError((error) => of(ApiActions.deleteFailure(error)))
        )
      )
    )
  );

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

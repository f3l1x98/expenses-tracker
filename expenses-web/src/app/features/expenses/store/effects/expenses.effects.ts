import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpensesApiService } from '../../api/expenses-api.service';
import * as ApiActions from '../actions/expenses-api.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class ExpensesEffect {
  constructor(
    private actions$: Actions,
    private apiService: ExpensesApiService
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

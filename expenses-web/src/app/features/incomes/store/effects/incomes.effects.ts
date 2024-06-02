import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IncomesApiService } from '../services/api/incomes-api.service';
import * as ApiActions from '../actions/incomes-api.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class IncomesEffect {
  constructor(
    private actions$: Actions,
    private apiService: IncomesApiService
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

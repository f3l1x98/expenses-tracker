import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '../../api/user-api.service';
import * as ApiActions from '../actions/user-api.actions';
import * as PageActions from '../actions/user-page.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private apiService: UserApiService,
  ) {}

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.register),
      switchMap((action) =>
        of(ApiActions.createStart({ request: action.request })),
      ),
    ),
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.createStart),
      switchMap((action) =>
        this.apiService.create$(action.request).pipe(
          map((result) => ApiActions.createSuccess({ result })),
          catchError((error) => of(ApiActions.createFailure({ error }))),
        ),
      ),
    ),
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.loadOwn),
      switchMap(() => of(ApiActions.loadOwnStart())),
    ),
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loadOwnStart),
      switchMap(() =>
        this.apiService.getOwn$().pipe(
          map((result) => ApiActions.loadOwnSuccess({ result })),
          catchError((error) => of(ApiActions.loadOwnFailure({ error }))),
        ),
      ),
    ),
  );
}

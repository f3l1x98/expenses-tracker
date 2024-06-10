import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PageActions from '../actions/auth-page.actions';
import * as ApiActions from '../actions/auth-api.actions';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { AuthApiService } from '../../api/auth-api.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService
  ) {}

  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.login),
      switchMap((action) =>
        of(ApiActions.loginStart({ request: action.request }))
      )
    )
  );
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loginStart),
      switchMap((action) =>
        this.authApiService.login$(action.request).pipe(
          take(1),
          map((result) => ApiActions.loginSuccess({ result })),
          catchError((error) => of(ApiActions.loginFailure({ error })))
        )
      )
    )
  );
}

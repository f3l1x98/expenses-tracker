import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService
  ) {}

  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap((action) =>
        of(AuthActions.loginStart({ request: action.request }))
      )
    )
  );
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((action) =>
        this.authApiService.login$(action.request).pipe(
          take(1),
          map((result) => AuthActions.loginSuccess({ result })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import * as UserActions from './user.actions';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, take } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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
        this.authService
          .login$(action.request.username, action.request.password)
          .pipe(
            take(1),
            map((result) => AuthActions.loginSuccess({ result })),
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
      )
    )
  );
}

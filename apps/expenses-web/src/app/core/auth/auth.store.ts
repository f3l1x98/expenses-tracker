import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IUser } from 'expenses-shared';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { AuthApiService } from './api/auth-api.service';

export type AuthUser = Pick<IUser, 'id' | 'username'>;

export interface AuthStatus {
  error: string | undefined;
  value: 'pending' | 'running' | 'success' | 'failure';
}

export type AuthState = {
  user: AuthUser | undefined;
  status: AuthStatus;
  token: string | undefined;
};

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  status: {
    error: undefined,
    value: 'pending',
  },
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorageSync({
    key: 'authState',
    autoSync: true,
  }),
  withMethods((store, client = inject(AuthApiService)) => ({
    login: rxMethod<{ username: string; password: string }>(
      pipe(
        tap(() =>
          patchState(store, { status: { error: undefined, value: 'running' } }),
        ),
        switchMap((input) =>
          client.login$(input).pipe(
            tap((result) =>
              patchState(store, {
                user: result.user,
                token: result.token,
                status: { error: undefined, value: 'success' },
              }),
            ),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                user: undefined,
                token: undefined,
                status: { error: e, value: 'failure' },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    logout(): void {
      patchState(store, {
        user: undefined,
        token: undefined,
        status: { error: undefined, value: 'pending' },
      });
    },
  })),
);

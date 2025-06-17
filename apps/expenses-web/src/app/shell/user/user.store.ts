import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ICreateUserDto, IUser } from 'expenses-shared';
import { StoreStateStatus } from '../../shared/interfaces/store-state-status.interface';
import { inject } from '@angular/core';
import { UserApiService } from './api/user-api.service';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';

export type UserState = {
  own: IUser | undefined;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
};

const initialState: UserState = {
  own: undefined,
  createStatus: {
    error: undefined,
    status: 'initial',
  },
  loadStatus: {
    error: undefined,
    status: 'initial',
  },
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>(initialState),
  withMethods((store, client = inject(UserApiService)) => ({
    loadOwn: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadStatus: { error: undefined, status: 'pending' },
          }),
        ),
        switchMap(() =>
          client.getOwn$().pipe(
            tap((result) => {
              patchState(store, {
                own: result,
                loadStatus: { error: undefined, status: 'success' },
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, { loadStatus: { error: e, status: 'error' } });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    clearOwn(): void {
      patchState(store, {
        own: undefined,
        loadStatus: { error: undefined, status: 'initial' },
      });
    },
    createUser: rxMethod<ICreateUserDto>(
      pipe(
        tap(() =>
          patchState(store, {
            createStatus: { error: undefined, status: 'pending' },
          }),
        ),
        switchMap((dto) =>
          client.create$(dto).pipe(
            tap(() =>
              patchState(store, {
                createStatus: { error: undefined, status: 'success' },
              }),
            ),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                createStatus: { error: e, status: 'error' },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
  })),
);

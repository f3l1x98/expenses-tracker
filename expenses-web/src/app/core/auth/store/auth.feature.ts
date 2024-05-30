import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthState, AuthStatus } from './auth.state';

import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  user: undefined,
  token: undefined,
  status: {
    error: undefined,
    value: 'pending',
  },
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.loginStart, (state) => ({
      ...state,
      status: { value: 'running' } as AuthStatus,
    })),
    on(AuthActions.loginSuccess, (state, { result }) => ({
      ...state,
      user: result.user,
      token: result.token,
      status: { value: 'success' } as AuthStatus,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      status: { value: 'failure', error: error } as AuthStatus,
    }))
  ),
  extraSelectors({ selectStatus }) {
    const selectErrorMessage = createSelector(
      selectStatus,
      (status) => status.error
    );

    return { selectErrorMessage };
  },
});
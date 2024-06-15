import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthState, AuthStatus } from '../interfaces/auth.state';

import * as ApiActions from '../actions/auth-api.actions';
import * as PageActions from '../actions/auth-page.actions';

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
    on(ApiActions.loginStart, (state) => ({
      ...state,
      status: { value: 'running' } as AuthStatus,
    })),
    on(ApiActions.loginSuccess, (state, { result }) => ({
      ...state,
      user: result.user,
      token: result.token,
      status: { value: 'success' } as AuthStatus,
    })),
    on(ApiActions.loginFailure, (state, { error }) => ({
      ...state,
      status: { value: 'failure', error: error } as AuthStatus,
    })),
    on(PageActions.logout, (state) => initialState),
  ),
  extraSelectors({ selectStatus }) {
    const selectErrorMessage = createSelector(
      selectStatus,
      (status) => status.error,
    );

    return { selectErrorMessage };
  },
});

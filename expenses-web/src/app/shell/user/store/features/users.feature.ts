import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersState } from '../interfaces/users.state';
import * as ApiActions from '../actions/user-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

const initialState: UsersState = {
  own: undefined,
  loadStatus: {
    error: undefined,
    status: 'initial',
  },
};

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(ApiActions.loadOwnStart, (state) => ({
      ...state,
      loadStatus: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadOwnSuccess, (state, { result }) => ({
      ...state,
      own: result,
      loadStatus: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadOwnFailure, (state, { error }) => ({
      ...state,
      loadStatus: { error: error, status: 'pending' } as StoreStateStatus,
    }))
  ),
});

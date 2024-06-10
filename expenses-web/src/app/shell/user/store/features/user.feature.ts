import { createFeature, createReducer, on } from '@ngrx/store';
import { UserState } from '../interfaces/user.state';
import * as ApiActions from '../actions/user-api.actions';
import * as PageActions from '../actions/user-page.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

const initialState: UserState = {
  own: undefined,
  loadStatus: {
    error: undefined,
    status: 'initial',
  },
};

export const userFeature = createFeature({
  name: 'user',
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
    })),

    on(PageActions.clear, (state) => ({
      ...state,
      own: undefined,
      loadStatus: { error: undefined, status: 'initial' } as StoreStateStatus,
    }))
  ),
});

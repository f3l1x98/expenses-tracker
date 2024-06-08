import { createFeature, createReducer, on } from '@ngrx/store';
import { IncomesState } from '../interfaces/incomes.state';
import * as ApiActions from '../actions/incomes-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export const initialState: IncomesState = {
  incomes: [],
  loadStatus: {
    error: undefined,
    status: 'initial',
  },
  createStatus: {
    error: undefined,
    status: 'initial',
  },
};

export const incomesFeature = createFeature({
  name: 'incomes',
  reducer: createReducer(
    initialState,
    on(ApiActions.loadStart, (state) => ({
      ...state,
      loadStatus: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadSuccess, (state, { result }) => ({
      ...state,
      incomes: result,
      loadStatus: { status: 'success' } as StoreStateStatus,
    })),
    on(ApiActions.loadFailure, (state, { error }) => ({
      ...state,
      loadStatus: { status: 'error', error } as StoreStateStatus,
    })),

    on(ApiActions.createStart, (state) => ({
      ...state,
      createStatus: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.createSuccess, (state) => ({
      ...state,
      createStatus: { status: 'success' } as StoreStateStatus,
    })),
    on(ApiActions.createFailure, (state, { error }) => ({
      ...state,
      createStatus: { status: 'error', error } as StoreStateStatus,
    }))
  ),
});

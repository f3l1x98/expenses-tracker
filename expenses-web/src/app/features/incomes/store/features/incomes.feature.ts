import { createFeature, createReducer, on } from '@ngrx/store';
import { IncomesState } from '../interfaces/incomes.state';
import * as ApiActions from '../actions/incomes-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export const initialState: IncomesState = {
  incomes: [],
  status: {
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
      status: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadSuccess, (state, { result }) => ({
      ...state,
      incomes: result,
      status: { status: 'success' } as StoreStateStatus,
    })),
    on(ApiActions.loadFailure, (state, { error }) => ({
      ...state,
      status: { status: 'error', error } as StoreStateStatus,
    }))
  ),
});

import { createFeature, createReducer, on } from '@ngrx/store';
import { ExpensesState } from '../interfaces/expenses.state';
import * as ApiActions from '../actions/expenses-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export const initialState: ExpensesState = {
  expenses: [],
  status: {
    error: undefined,
    status: 'initial',
  },
};

export const expensesFeature = createFeature({
  name: 'expenses',
  reducer: createReducer(
    initialState,
    on(ApiActions.loadStart, (state) => ({
      ...state,
      status: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadSuccess, (state, { result }) => ({
      ...state,
      expenses: result,
      status: { status: 'success' } as StoreStateStatus,
    })),
    on(ApiActions.loadFailure, (state, { error }) => ({
      ...state,
      status: { status: 'error', error: error } as StoreStateStatus,
    }))
  ),
});

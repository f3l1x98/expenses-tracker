import { createFeature, createReducer, on } from '@ngrx/store';
import { RecurringExpensesState } from '../interfaces/recurring-expenses.state';
import * as ApiActions from '../actions/recurring-expenses-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export const initialState: RecurringExpensesState = {
  recurringExpenses: [],
  loadStatus: {
    error: undefined,
    status: 'initial',
  },
  createStatus: {
    error: undefined,
    status: 'initial',
  },
  deleteStatus: {
    error: undefined,
    status: 'initial',
  },
};

export const recurringExpensesFeature = createFeature({
  name: 'recurringExpenses',
  reducer: createReducer(
    initialState,
    on(ApiActions.loadStart, (state) => ({
      ...state,
      loadStatus: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadSuccess, (state, { result }) => ({
      ...state,
      recurringExpenses: result,
      loadStatus: { status: 'success', error: undefined } as StoreStateStatus,
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
      createStatus: { status: 'success', error: undefined } as StoreStateStatus,
    })),
    on(ApiActions.createFailure, (state, { error }) => ({
      ...state,
      createStatus: { status: 'error', error } as StoreStateStatus,
    })),

    on(ApiActions.deleteStart, (state) => ({
      ...state,
      deleteStatus: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.deleteSuccess, (state) => ({
      ...state,
      deleteStatus: { status: 'success' } as StoreStateStatus,
    })),
    on(ApiActions.deleteFailure, (state, { error }) => ({
      ...state,
      deleteStatus: { status: 'error', error: error } as StoreStateStatus,
    })),
  ),
});

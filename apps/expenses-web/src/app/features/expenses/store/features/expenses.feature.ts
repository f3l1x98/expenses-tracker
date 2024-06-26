import { createFeature, createReducer, on } from '@ngrx/store';
import { ExpensesState } from '../interfaces/expenses.state';
import * as ApiActions from '../actions/expenses-api.actions';
import * as PageActions from '../actions/expenses-page.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export const initialState: ExpensesState = {
  expenses: [],
  filter: {
    description: undefined,
    category: undefined,
    startDate: undefined,
    endDate: undefined,
  },
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

export const expensesFeature = createFeature({
  name: 'expenses',
  reducer: createReducer(
    initialState,
    on(ApiActions.loadStart, (state) => ({
      ...state,
      loadStatus: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadSuccess, (state, { result }) => ({
      ...state,
      expenses: result,
      loadStatus: { status: 'success' } as StoreStateStatus,
    })),
    on(ApiActions.loadFailure, (state, { error }) => ({
      ...state,
      loadStatus: { status: 'error', error: error } as StoreStateStatus,
    })),

    on(PageActions.updateFilter, (state, { filter }) => ({ ...state, filter })),

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
      createStatus: { status: 'error', error: error } as StoreStateStatus,
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

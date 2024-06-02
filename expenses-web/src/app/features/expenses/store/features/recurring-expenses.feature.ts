import { createFeature, createReducer, on } from '@ngrx/store';
import { RecurringExpensesState } from '../interfaces/recurring-expenses.state';
import * as ApiActions from '../actions/recurring-expenses-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export const initialState: RecurringExpensesState = {
  recurringExpenses: [],
  status: {
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
      status: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadSuccess, (state, { result }) => ({
      ...state,
      recurringExpenses: result,
      status: { status: 'success', error: undefined } as StoreStateStatus,
    })),
    on(ApiActions.loadFailure, (state, { error }) => ({
      ...state,
      status: { status: 'error', error } as StoreStateStatus,
    }))
  ),
});

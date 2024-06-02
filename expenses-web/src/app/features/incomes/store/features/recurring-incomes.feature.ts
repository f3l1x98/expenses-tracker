import { createFeature, createReducer, on } from '@ngrx/store';
import * as ApiActions from '../actions/recurring-incomes-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { RecurringIncomesState } from '../interfaces/recurring-incomes.state';

export const initialState: RecurringIncomesState = {
  recurringIncomes: [],
  status: {
    error: undefined,
    status: 'initial',
  },
};

export const recurringIncomesFeature = createFeature({
  name: 'recurringIncomes',
  reducer: createReducer(
    initialState,
    on(ApiActions.loadStart, (state) => ({
      ...state,
      status: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadSuccess, (state, { result }) => ({
      ...state,
      recurringIncomes: result,
      status: { status: 'success' } as StoreStateStatus,
    })),
    on(ApiActions.loadFailure, (state, { error }) => ({
      ...state,
      status: { status: 'error', error } as StoreStateStatus,
    }))
  ),
});

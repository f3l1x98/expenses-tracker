import { createFeature, createReducer, on } from '@ngrx/store';
import { HomeState } from '../interfaces/home.state';
import * as ApiActions from '../actions/home-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export const initialState: HomeState = {
  filter: {
    startDate: new Date(),
    endDate: new Date(),
  },
  currentMonthData: undefined,
  expensesPerCategory: undefined,
  expensesPerMonth: undefined,
  status: {
    error: undefined,
    status: 'initial',
  },
};

export const homeFeature = createFeature({
  name: 'home',
  reducer: createReducer(
    initialState,
    on(ApiActions.loadStart, (state, { filter }) => ({
      ...state,
      filter,
      status: { status: 'pending' } as StoreStateStatus,
    })),
    on(ApiActions.loadSuccess, (state, { result }) => ({
      ...state,
      currentMonthData: result.currentMonthData,
      expensesPerCategory: result.expensesPerCategory,
      expensesPerMonth: result.expensesPerMonth,
      status: {
        status: 'success',
      } as StoreStateStatus,
    })),
    on(ApiActions.loadFailure, (state, { error }) => ({
      ...state,
      status: {
        error,
        status: 'error',
      } as StoreStateStatus,
    }))
  ),
});

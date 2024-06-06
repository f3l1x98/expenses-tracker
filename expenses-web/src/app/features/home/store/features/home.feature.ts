import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { HomeState } from '../interfaces/home.state';
import * as ApiActions from '../actions/home-api.actions';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export const initialState: HomeState = {
  filter: {
    startDate: new Date(),
    endDate: new Date(),
  },
  currentMonthData: {
    data: undefined,
    status: {
      error: undefined,
      status: 'initial',
    },
  },
  expensesPerCategory: {
    data: undefined,
    status: {
      error: undefined,
      status: 'initial',
    },
  },
  expensesPerMonth: {
    data: undefined,
    status: {
      error: undefined,
      status: 'initial',
    },
  },
};

export const homeFeature = createFeature({
  name: 'home',
  reducer: createReducer(
    initialState,
    on(ApiActions.currentMonthDataLoadStart, (state) => ({
      ...state,
      currentMonthData: {
        data: undefined,
        status: {
          status: 'pending',
        } as StoreStateStatus,
      },
    })),
    on(ApiActions.currentMonthDataLoadSuccess, (state, { result }) => ({
      ...state,
      currentMonthData: {
        data: result,
        status: {
          status: 'success',
        } as StoreStateStatus,
      },
    })),
    on(ApiActions.currentMonthDataLoadFailure, (state, { error }) => ({
      ...state,
      currentMonthData: {
        data: undefined,
        status: {
          error,
          status: 'error',
        } as StoreStateStatus,
      },
    })),

    on(ApiActions.expensesPerCategoryLoadStart, (state) => ({
      ...state,
      expensesPerCategory: {
        data: undefined,
        status: {
          status: 'pending',
        } as StoreStateStatus,
      },
    })),
    on(ApiActions.expensesPerCategoryLoadSuccess, (state, { result }) => ({
      ...state,
      expensesPerCategory: {
        data: result,
        status: {
          status: 'success',
        } as StoreStateStatus,
      },
    })),
    on(ApiActions.expensesPerCategoryLoadFailure, (state, { error }) => ({
      ...state,
      expensesPerCategory: {
        data: undefined,
        status: {
          error,
          status: 'error',
        } as StoreStateStatus,
      },
    })),

    on(ApiActions.expensesPerMonthLoadStart, (state) => ({
      ...state,
      expensesPerMonth: {
        data: undefined,
        status: {
          status: 'pending',
        } as StoreStateStatus,
      },
    })),
    on(ApiActions.expensesPerMonthLoadSuccess, (state, { result }) => ({
      ...state,
      expensesPerMonth: {
        data: result,
        status: {
          status: 'success',
        } as StoreStateStatus,
      },
    })),
    on(ApiActions.expensesPerMonthLoadFailure, (state, { error }) => ({
      ...state,
      expensesPerMonth: {
        data: undefined,
        status: {
          error,
          status: 'error',
        } as StoreStateStatus,
      },
    }))
  ),
  extraSelectors({
    selectCurrentMonthData,
    selectExpensesPerCategory,
    selectExpensesPerMonth,
  }) {
    const selectCurrentMonthDataData = createSelector(
      selectCurrentMonthData,
      (data) => data.data
    );
    const selectCurrentMonthDataStatus = createSelector(
      selectCurrentMonthData,
      (data) => data.status
    );

    const selectExpensesPerCategoryData = createSelector(
      selectExpensesPerCategory,
      (data) => data.data
    );
    const selectExpensesPerCategoryStatus = createSelector(
      selectExpensesPerCategory,
      (data) => data.status
    );

    const selectExpensesPerMonthData = createSelector(
      selectExpensesPerMonth,
      (data) => data.data
    );
    const selectExpensesPerMonthStatus = createSelector(
      selectExpensesPerMonth,
      (data) => data.status
    );

    return {
      selectCurrentMonthDataData,
      selectCurrentMonthDataStatus,
      selectExpensesPerCategoryData,
      selectExpensesPerCategoryStatus,
      selectExpensesPerMonthData,
      selectExpensesPerMonthStatus,
    };
  },
});

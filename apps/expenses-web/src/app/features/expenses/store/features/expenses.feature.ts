import { createFeature, createReducer, on } from '@ngrx/store';
import { ExpensesState } from '../interfaces/expenses.state';
import * as ApiActions from '../actions/expenses-api.actions';
import * as PageActions from '../actions/expenses-page.actions';
import {
  StoreStateStatus,
  UpdateStoreStateStatusEntry,
} from '../../../../shared/interfaces/store-state-status.interface';

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
  updateStatus: {},
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
      updateStatus: result
        .map((expense) => ({
          [expense.id]: {
            status: 'initial',
            isEdit: false,
          } as UpdateStoreStateStatusEntry,
        }))
        .reduce((result, element) => ({ ...result, ...element })),
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

    on(PageActions.toggleIsEdit, (state, { id }) => ({
      ...state,
      updateStatus: {
        ...state.updateStatus,
        [id]: {
          ...state.updateStatus[id],
          isEdit: !state.updateStatus[id].isEdit,
        } as UpdateStoreStateStatusEntry,
      },
    })),
    on(ApiActions.updateStart, (state, { id }) => ({
      ...state,
      updateStatus: {
        ...state.updateStatus,
        [id]: {
          ...state.updateStatus[id],
          status: 'pending',
        } as UpdateStoreStateStatusEntry,
      },
    })),
    on(ApiActions.updateSuccess, (state, { result }) => ({
      ...state,
      updateStatus: {
        ...state.updateStatus,
        [result.id]: {
          ...state.updateStatus[result.id],
          status: 'success',
        } as UpdateStoreStateStatusEntry,
      },
    })),
    on(ApiActions.updateFailure, (state, { id, error }) => ({
      ...state,
      updateStatus: {
        ...state.updateStatus,
        [id]: {
          ...state.updateStatus[id],
          status: 'error',
          error: error,
        } as UpdateStoreStateStatusEntry,
      },
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

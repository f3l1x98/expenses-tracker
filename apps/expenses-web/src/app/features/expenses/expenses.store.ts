import {
  ICreateExpenseDto,
  IExpense,
  IExpenseFilterDto,
  IUpdateExpenseDto,
} from 'expenses-shared';
import {
  StoreStateStatus,
  UpdateStoreStateStatus,
} from '../../shared/interfaces/store-state-status.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { ExpensesApiService } from './api/expenses-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';

export type ExpensesState = {
  filter: IExpenseFilterDto;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  updateStatus: UpdateStoreStateStatus;
  deleteStatus: StoreStateStatus;
};

const initialState: ExpensesState = {
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
  updateStatus: {
    status: 'initial',
    error: undefined,
    isEdit: false,
    editingId: undefined,
  },
  deleteStatus: {
    error: undefined,
    status: 'initial',
  },
};

export const ExpensesStore = signalStore(
  withState(initialState),
  withEntities<IExpense>(),
  withMethods((store, expensesClient = inject(ExpensesApiService)) => ({
    loadExpenses: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap(() =>
          expensesClient.getAll$(store.filter()).pipe(
            tap((result) => {
              patchState(store, setAllEntities(result));
              patchState(store, {
                loadStatus: { status: 'success', error: undefined },
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, { loadStatus: { status: 'error', error: e } });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    createExpense: rxMethod<ICreateExpenseDto>(
      pipe(
        tap(() =>
          patchState(store, {
            createStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap((dto) =>
          expensesClient.create$(dto).pipe(
            tap((result) => {
              patchState(store, addEntity(result));
              patchState(store, {
                createStatus: { status: 'success', error: undefined },
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                createStatus: { status: 'error', error: e },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    updateExpense: rxMethod<{ id: string; dto: IUpdateExpenseDto }>(
      pipe(
        tap((payload) =>
          patchState(store, {
            updateStatus: {
              status: 'pending',
              error: undefined,
              isEdit: true,
              editingId: payload.id,
            },
          }),
        ),
        switchMap(({ id, dto }) =>
          expensesClient.update$(id, dto).pipe(
            tap((result) => {
              patchState(store, setEntity(result));
              patchState(store, {
                updateStatus: {
                  status: 'success',
                  error: undefined,
                  isEdit: false,
                  editingId: undefined,
                },
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                updateStatus: {
                  status: 'error',
                  error: e,
                  isEdit: false,
                  editingId: undefined,
                },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    deleteExpense: rxMethod<string>(
      pipe(
        tap(() =>
          patchState(store, {
            deleteStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap((id) =>
          expensesClient.delete$(id).pipe(
            tap(() => {
              patchState(store, removeEntity(id));
              patchState(store, {
                deleteStatus: { status: 'success', error: undefined },
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                deleteStatus: {
                  status: 'error',
                  error: e,
                },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    toggleIsEdit(id: string): void {
      const currentUpdateStatus = store.updateStatus();
      patchState(store, {
        updateStatus: {
          ...currentUpdateStatus,
          isEdit: !currentUpdateStatus.isEdit,
          editingId: currentUpdateStatus.isEdit ? undefined : id,
        },
      });
    },
    updateFilter(filter: IExpenseFilterDto): void {
      patchState(store, { filter: filter });
    },
  })),
);

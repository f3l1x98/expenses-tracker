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
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import {
  ICreateRecurringIncomeDto,
  IRecurringIncome,
  IRecurringIncomeFilterDto,
  IUpdateRecurringIncomeDto,
} from 'expenses-shared';
import { RecurringIncomesApiService } from './api/recurring-incomes-api.service';

export type IncomesState = {
  filter: IRecurringIncomeFilterDto;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  updateStatus: UpdateStoreStateStatus;
  deleteStatus: StoreStateStatus;
};

const initialState: IncomesState = {
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

export const RecurringIncomesStore = signalStore(
  withState(initialState),
  withEntities<IRecurringIncome>(),
  withMethods((store, client = inject(RecurringIncomesApiService)) => ({
    loadRecurringIncomes: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap(() =>
          client.getAll$(store.filter()).pipe(
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
    createRecurringIncome: rxMethod<ICreateRecurringIncomeDto>(
      pipe(
        tap(() =>
          patchState(store, {
            createStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap((dto) =>
          client.create$(dto).pipe(
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
    updateRecurringIncome: rxMethod<{
      id: string;
      dto: IUpdateRecurringIncomeDto;
    }>(
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
          client.update$(id, dto).pipe(
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
    deleteRecurringIncome: rxMethod<string>(
      pipe(
        tap(() =>
          patchState(store, {
            deleteStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap((id) =>
          client.delete$(id).pipe(
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
    updateFilter(filter: IRecurringIncomeFilterDto): void {
      patchState(store, { filter: filter });
    },
  })),
);

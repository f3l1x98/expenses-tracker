import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StoreStateStatus } from '../../shared/interfaces/store-state-status.interface';
import {
  IHouseholdExpensePerCategoryResponse,
  IHouseholdExpenseResponse,
  IHouseholdIncomePerCategoryResponse,
  IHouseholdIncomeResponse,
} from 'expenses-shared';
import { inject } from '@angular/core';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HouseholdPlanerApiService } from './api/household-planer-api.service';

export type HouseholdPlanerState = {
  loadStatus: StoreStateStatus;
  householdExpenses: IHouseholdExpenseResponse;
  householdIncomes: IHouseholdIncomeResponse;
  householdExpensesOverview: IHouseholdExpensePerCategoryResponse;
  householdIncomesOverview: IHouseholdIncomePerCategoryResponse;
};

const initialState: HouseholdPlanerState = {
  loadStatus: {
    error: undefined,
    status: 'initial',
  },
  householdExpenses: {
    currency: '',
    data: [],
  },
  householdIncomes: {
    currency: '',
    data: [],
  },
  householdExpensesOverview: {
    currency: '',
    data: [],
  },
  householdIncomesOverview: {
    currency: '',
    data: [],
  },
};

export const HouseholdPlanerStore = signalStore(
  withState(initialState),
  withMethods((store, client = inject(HouseholdPlanerApiService)) => ({
    loadHouseholdExpenses: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap(() =>
          client.getHouseholdExpenses$().pipe(
            tap((result) => {
              patchState(store, {
                loadStatus: { status: 'success', error: undefined },
                householdExpenses: result,
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                loadStatus: { status: 'error', error: e },
                householdExpenses: {
                  currency: '',
                  data: [],
                },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    loadHouseholdIncomes: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap(() =>
          client.getHouseholdIncomes$().pipe(
            tap((result) => {
              patchState(store, {
                loadStatus: { status: 'success', error: undefined },
                householdIncomes: result,
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                loadStatus: { status: 'error', error: e },
                householdIncomes: {
                  currency: '',
                  data: [],
                },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),

    loadHouseholdExpensesOverview: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap(() =>
          client.getHouseholdExpensesOverview$().pipe(
            tap((result) => {
              patchState(store, {
                loadStatus: { status: 'success', error: undefined },
                householdExpensesOverview: result,
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                loadStatus: { status: 'error', error: e },
                householdExpensesOverview: {
                  currency: '',
                  data: [],
                },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    loadHouseholdIncomesOverivew: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap(() =>
          client.getHouseholdIncomesOverview$().pipe(
            tap((result) => {
              patchState(store, {
                loadStatus: { status: 'success', error: undefined },
                householdIncomesOverview: result,
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                loadStatus: { status: 'error', error: e },
                householdIncomesOverview: {
                  currency: '',
                  data: [],
                },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
  })),
);

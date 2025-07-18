import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { StoreStateStatus } from '../../shared/interfaces/store-state-status.interface';
import {
  IHouseholdExpenseResponse,
  IHouseholdIncomeResponse,
  IHouseholdOverview,
} from 'expenses-shared';
import { computed, inject } from '@angular/core';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HouseholdPlanerApiService } from './api/household-planer-api.service';

export type HouseholdPlanerState = {
  loadStatus: StoreStateStatus;
  householdExpenses: IHouseholdExpenseResponse;
  householdIncomes: IHouseholdIncomeResponse;
  householdOverview: IHouseholdOverview;
};

const initialState: HouseholdPlanerState = {
  loadStatus: {
    error: undefined,
    status: 'initial',
  },
  householdExpenses: {
    currency: 'EUR',
    data: [],
  },
  householdIncomes: {
    currency: 'EUR',
    data: [],
  },
  householdOverview: {
    currency: 'EUR',
    expensesPerCategory: [],
    totalExpense: {
      monthlyAmount: 0.0,
      quarterlyAmount: 0.0,
      yearlyAmount: 0.0,
    },
    totalIncome: {
      monthlyAmount: 0.0,
      quarterlyAmount: 0.0,
      yearlyAmount: 0.0,
    },
  },
};

export const HouseholdPlanerStore = signalStore(
  withState(initialState),
  withComputed(({ householdOverview }) => ({
    householdOverviewMonthlyLeftOver: computed(() => {
      const totalExpense = householdOverview.totalExpense();
      const totalIncome = householdOverview.totalIncome();
      return totalIncome.monthlyAmount - totalExpense.monthlyAmount;
    }),
    householdOverviewYearlyLeftOver: computed(() => {
      const totalExpense = householdOverview.totalExpense();
      const totalIncome = householdOverview.totalIncome();
      return totalIncome.yearlyAmount - totalExpense.yearlyAmount;
    }),
  })),
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
                  currency: 'EUR',
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
                  currency: 'EUR',
                  data: [],
                },
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
    loadHouseholdOverview: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadStatus: { status: 'pending', error: undefined },
          }),
        ),
        switchMap(() =>
          client.getHouseholdOverview$().pipe(
            tap((result) => {
              patchState(store, {
                loadStatus: { status: 'success', error: undefined },
                householdOverview: result,
              });
            }),
            catchError((e) => {
              // TODO
              console.error(e);
              patchState(store, {
                loadStatus: { status: 'error', error: e },
                householdOverview: {
                  currency: 'EUR',
                  expensesPerCategory: [],
                  totalExpense: {
                    monthlyAmount: 0.0,
                    quarterlyAmount: 0.0,
                    yearlyAmount: 0.0,
                  },
                  totalIncome: {
                    monthlyAmount: 0.0,
                    quarterlyAmount: 0.0,
                    yearlyAmount: 0.0,
                  },
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

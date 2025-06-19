import {
  CurrentMonthDataDto,
  ExpensesPerCategoryResponse,
  ExpensesPerMonthResponse,
} from 'expenses-shared';
import { DateRange } from '../../shared/interfaces/date-range.interface';
import { StoreStateStatus } from '../../shared/interfaces/store-state-status.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { HomeApiService } from './api/home-api.service';

type HomeState = {
  filter: DateRange;
  currentMonthData: {
    data: CurrentMonthDataDto | undefined;
    status: StoreStateStatus;
  };
  expensesPerCategory: {
    data: ExpensesPerCategoryResponse | undefined;
    status: StoreStateStatus;
  };
  expensesPerMonth: {
    data: ExpensesPerMonthResponse | undefined;
    status: StoreStateStatus;
  };
};

const initialState: HomeState = {
  filter: {
    startDate: new Date(),
    endDate: undefined,
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

export const HomeStore = signalStore(
  withState(initialState),
  withMethods((store, homeApiService = inject(HomeApiService)) => ({
    setDateRangeFilter(filter: DateRange): void {
      patchState(store, { filter });
    },
    loadCurrentMonthData: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            currentMonthData: {
              data: undefined,
              status: {
                error: undefined,
                status: 'pending',
              },
            },
          }),
        ),
        switchMap(() => {
          return homeApiService.getCurrentMonthData$().pipe(
            tap((result) =>
              patchState(store, {
                currentMonthData: {
                  data: result,
                  status: {
                    error: undefined,
                    status: 'success',
                  },
                },
              }),
            ),
            catchError((err) => {
              // TODO
              console.error(err);
              patchState(store, {
                currentMonthData: {
                  data: undefined,
                  status: {
                    error: err,
                    status: 'error',
                  },
                },
              });
              return EMPTY;
            }),
          );
        }),
      ),
    ),
    loadExpensesPerCategory: rxMethod<DateRange>(
      pipe(
        tap(() =>
          patchState(store, {
            expensesPerCategory: {
              data: undefined,
              status: {
                error: undefined,
                status: 'pending',
              },
            },
          }),
        ),
        switchMap((filter) => {
          return homeApiService
            .getExpensesPerCategory$(filter.startDate, filter.endDate)
            .pipe(
              tap((result) =>
                patchState(store, {
                  expensesPerCategory: {
                    data: result,
                    status: {
                      status: 'success',
                    } as StoreStateStatus,
                  },
                }),
              ),
              catchError((err) => {
                // TODO
                console.error(err);
                patchState(store, (state) => ({
                  expensesPerCategory: {
                    ...state.expensesPerCategory,
                    status: {
                      error: err,
                      status: 'error',
                    } as StoreStateStatus,
                  },
                }));
                return EMPTY;
              }),
            );
        }),
      ),
    ),
    loadExpensesPerMonth: rxMethod<DateRange>(
      pipe(
        tap(() =>
          patchState(store, {
            expensesPerMonth: {
              data: undefined,
              status: {
                error: undefined,
                status: 'pending',
              },
            },
          }),
        ),
        switchMap((filter) => {
          return homeApiService
            .getExpensesPerMonth$(filter.startDate, filter.endDate)
            .pipe(
              tap((result) =>
                patchState(store, {
                  expensesPerMonth: {
                    data: result,
                    status: {
                      error: undefined,
                      status: 'success',
                    },
                  },
                }),
              ),
              catchError((err) => {
                // TODO
                console.error(err);
                patchState(store, {
                  expensesPerMonth: {
                    data: undefined,
                    status: {
                      error: err,
                      status: 'error',
                    },
                  },
                });
                return EMPTY;
              }),
            );
        }),
      ),
    ),
  })),
);

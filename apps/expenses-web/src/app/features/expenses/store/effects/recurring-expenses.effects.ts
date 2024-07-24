import { Injectable } from '@angular/core';
import { RecurringExpensesApiService } from '../../api/recurring-expense-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ApiActions from '../actions/recurring-expenses-api.actions';
import * as PageActions from '../actions/recurring-expenses-page.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { recurringExpensesFeature } from '../features/recurring-expenses.feature';
import { RecurringExpensesState } from '../interfaces/recurring-expenses.state';
import { Store } from '@ngrx/store';

@Injectable()
export class RecurringExpensesEffect {
  constructor(
    private store: Store<RecurringExpensesState>,
    private actions$: Actions,
    private apiService: RecurringExpensesApiService,
  ) {}

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.deleteRequest),
      switchMap((action) => of(ApiActions.deleteStart({ id: action.id }))),
    ),
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.deleteStart),
      switchMap((action) =>
        this.apiService.delete$(action.id).pipe(
          switchMap(() =>
            of(ApiActions.deleteSuccess(), ApiActions.loadStart()),
          ),
          catchError((error) => of(ApiActions.deleteFailure(error))),
        ),
      ),
    ),
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.createRequest),
      switchMap((action) =>
        of(ApiActions.createStart({ request: action.request })),
      ),
    ),
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.createStart),
      switchMap((action) =>
        this.apiService.create$(action.request).pipe(
          switchMap((result) =>
            of(ApiActions.createSuccess({ result }), ApiActions.loadStart()),
          ),
          catchError((error) => of(ApiActions.createFailure(error))),
        ),
      ),
    ),
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loadStart),
      withLatestFrom(this.store.select(recurringExpensesFeature.selectFilter)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([action, filterState]) =>
        this.apiService.getAll$(filterState).pipe(
          map((result) => ApiActions.loadSuccess({ result })),
          catchError((error) => of(ApiActions.loadFailure({ error }))),
        ),
      ),
    ),
  );

  updateFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.updateFilter),
      switchMap(() => of(ApiActions.loadStart())),
    ),
  );
}

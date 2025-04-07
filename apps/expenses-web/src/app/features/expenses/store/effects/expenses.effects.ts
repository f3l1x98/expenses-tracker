import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpensesApiService } from '../../api/expenses-api.service';
import * as ApiActions from '../actions/expenses-api.actions';
import * as PageActions from '../actions/expenses-page.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ExpensesState } from '../interfaces/expenses.state';
import { expensesFeature } from '../features/expenses.feature';

@Injectable()
export class ExpensesEffect {
  constructor(
    private store: Store<ExpensesState>,
    private actions$: Actions,
    private apiService: ExpensesApiService,
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

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.updateRequest),
      switchMap((action) =>
        of(ApiActions.updateStart({ id: action.id, request: action.request })),
      ),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.updateStart),
      switchMap((action) =>
        this.apiService.update$(action.id, action.request).pipe(
          switchMap((result) =>
            of(ApiActions.updateSuccess({ result }), ApiActions.loadStart()),
          ),
          catchError((error) =>
            of(ApiActions.updateFailure({ id: action.id, error: error })),
          ),
        ),
      ),
    ),
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loadStart),
      withLatestFrom(this.store.select(expensesFeature.selectFilter)),
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

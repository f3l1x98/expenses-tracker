import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ApiActions from '../actions/recurring-incomes-api.actions';
import * as PageActions from '../actions/recurring-incomes-page.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { RecurringIncomesApiService } from '../../api/recurring-incomes-api.service';
import { Store } from '@ngrx/store';
import { RecurringIncomesState } from '../interfaces/recurring-incomes.state';
import { recurringIncomesFeature } from '../features/recurring-incomes.feature';

@Injectable()
export class RecurringIncomesEffect {
  #store = inject<Store<RecurringIncomesState>>(Store);
  #actions$ = inject(Actions);
  #apiService = inject(RecurringIncomesApiService);

  deleteUser$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(PageActions.deleteRequest),
      switchMap((action) => of(ApiActions.deleteStart({ id: action.id }))),
    ),
  );

  delete$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(ApiActions.deleteStart),
      switchMap((action) =>
        this.#apiService.delete$(action.id).pipe(
          switchMap(() =>
            of(ApiActions.deleteSuccess(), ApiActions.loadStart()),
          ),
          catchError((error) => of(ApiActions.deleteFailure(error))),
        ),
      ),
    ),
  );

  createUser$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(PageActions.createRequest),
      switchMap((action) =>
        of(ApiActions.createStart({ request: action.request })),
      ),
    ),
  );

  create$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(ApiActions.createStart),
      switchMap((action) =>
        this.#apiService.create$(action.request).pipe(
          switchMap((result) =>
            of(ApiActions.createSuccess({ result }), ApiActions.loadStart()),
          ),
          catchError((error) => of(ApiActions.createFailure(error))),
        ),
      ),
    ),
  );

  load$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(ApiActions.loadStart),
      withLatestFrom(this.#store.select(recurringIncomesFeature.selectFilter)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([action, filterState]) =>
        this.#apiService.getAll$(filterState).pipe(
          map((result) => ApiActions.loadSuccess({ result })),
          catchError((error) => of(ApiActions.loadFailure({ error }))),
        ),
      ),
    ),
  );

  updateFilter$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(PageActions.updateFilter),
      switchMap(() => of(ApiActions.loadStart())),
    ),
  );
}

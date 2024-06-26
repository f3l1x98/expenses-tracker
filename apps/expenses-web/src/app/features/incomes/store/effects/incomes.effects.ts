import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IncomesApiService } from '../../api/incomes-api.service';
import * as ApiActions from '../actions/incomes-api.actions';
import * as PageActions from '../actions/incomes-page.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { IncomesState } from '../interfaces/incomes.state';
import { Store } from '@ngrx/store';
import { incomesFeature } from '../features/incomes.feature';

@Injectable()
export class IncomesEffect {
  constructor(
    private store: Store<IncomesState>,
    private actions$: Actions,
    private apiService: IncomesApiService,
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
      withLatestFrom(this.store.select(incomesFeature.selectFilter)),
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

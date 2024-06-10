import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../../api/users-api.service';
import * as ApiActions from '../actions/user-api.actions';
import * as PageActions from '../actions/user-page.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private apiService: UsersApiService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.loadOwn),
      switchMap((action) => of(ApiActions.loadOwnStart()))
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loadOwnStart),
      switchMap((action) =>
        this.apiService.getOwn$().pipe(
          map((result) => ApiActions.loadOwnSuccess({ result })),
          catchError((error) => of(ApiActions.loadOwnFailure({ error })))
        )
      )
    )
  );
}

import { createAction, props } from '@ngrx/store';
import { IUser } from 'expenses-shared';
import { CreateUserRequest } from '../../api/interfaces/requests/create-user-request.interface';

export const loadOwnStart = createAction('[User Api Actions] load own start');
export const loadOwnSuccess = createAction(
  '[User Api Actions] load own success',
  props<{ result: IUser }>(),
);
export const loadOwnFailure = createAction(
  '[User Api Actions] load own failure',
  props<{ error: string }>(),
);

export const createStart = createAction(
  '[User Api Actions] create start',
  props<{ request: CreateUserRequest }>(),
);
export const createSuccess = createAction(
  '[User Api Actions] create success',
  props<{ result: IUser }>(),
);
export const createFailure = createAction(
  '[User Api Actions] create failure',
  props<{ error: string }>(),
);

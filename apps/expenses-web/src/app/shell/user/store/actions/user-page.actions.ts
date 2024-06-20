import { createAction, props } from '@ngrx/store';
import { ICreateUserDto } from 'expenses-shared';

export const loadOwn = createAction('[User Page Actions] load own');
export const clear = createAction('[User Page Actions] clear');
export const register = createAction(
  '[User Page Actions] register',
  props<{ request: ICreateUserDto }>(),
);

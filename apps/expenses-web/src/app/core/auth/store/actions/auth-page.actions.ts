import { createAction, props } from '@ngrx/store';
import { ILoginUserDto } from 'expenses-shared';

export const login = createAction(
  '[Auth Page Actions] login',
  props<{ request: ILoginUserDto }>(),
);

export const logout = createAction('[Auth Page Actions] logout');

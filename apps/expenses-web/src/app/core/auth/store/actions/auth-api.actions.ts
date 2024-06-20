import { createAction, props } from '@ngrx/store';
import { ILoginUserDto, ILoginUserResponse } from 'expenses-shared';

export const loginStart = createAction(
  '[Auth Api Actions] login start',
  props<{ request: ILoginUserDto }>(),
);

export const loginSuccess = createAction(
  '[Auth Api Actions] login success',
  props<{ result: ILoginUserResponse }>(),
);

export const loginFailure = createAction(
  '[Auth Api Actions] login failure',
  props<{ error: string }>(),
);

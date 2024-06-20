import { createAction, props } from '@ngrx/store';
import { UserLoginResponse } from '../../api/interfaces/user-login-response.interface';
import { ILoginUserDto } from 'expenses-shared';

export const loginStart = createAction(
  '[Auth Api Actions] login start',
  props<{ request: ILoginUserDto }>(),
);

export const loginSuccess = createAction(
  '[Auth Api Actions] login success',
  props<{ result: UserLoginResponse }>(),
);

export const loginFailure = createAction(
  '[Auth Api Actions] login failure',
  props<{ error: string }>(),
);

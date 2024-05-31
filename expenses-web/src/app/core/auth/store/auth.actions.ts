import { createAction, props } from '@ngrx/store';
import { UserLoginRequest } from './api/user-login-request.interface';
import { UserLoginResponse } from './api/user-login-response.interface';

export const loginStart = createAction(
  '[Auth Service] login start',
  props<{ request: UserLoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth Service] login success',
  props<{ result: UserLoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth Service] login failure',
  props<{ error: string }>()
);

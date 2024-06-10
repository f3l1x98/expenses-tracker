import { createAction, props } from '@ngrx/store';
import { UserLoginRequest } from '../../api/interfaces/user-login-request.interface';
import { UserLoginResponse } from '../../api/interfaces/user-login-response.interface';

export const loginStart = createAction(
  '[Auth Api Actions] login start',
  props<{ request: UserLoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth Api Actions] login success',
  props<{ result: UserLoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth Api Actions] login failure',
  props<{ error: string }>()
);

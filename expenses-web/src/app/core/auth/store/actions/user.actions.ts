import { createAction, props } from '@ngrx/store';
import { UserLoginRequest } from '../../api/interfaces/user-login-request.interface';

export const login = createAction(
  '[User] login',
  props<{ request: UserLoginRequest }>()
);

export const logout = createAction('[User] logout');
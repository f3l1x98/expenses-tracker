import { createAction, props } from '@ngrx/store';
import { UserLoginRequest } from '../../api/interfaces/user-login-request.interface';

export const login = createAction(
  '[Auth Page Actions] login',
  props<{ request: UserLoginRequest }>()
);

export const logout = createAction('[Auth Page Actions] logout');

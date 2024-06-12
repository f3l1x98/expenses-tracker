import { createAction, props } from '@ngrx/store';
import { CreateUserRequest } from '../../api/interfaces/requests/create-user-request.interface';

export const loadOwn = createAction('[User Page Actions] load own');
export const clear = createAction('[User Page Actions] clear');
export const register = createAction(
  '[User Page Actions] register',
  props<{ request: CreateUserRequest }>()
);

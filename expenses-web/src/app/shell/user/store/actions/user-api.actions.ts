import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/user.interface';

export const loadOwnStart = createAction('[Users Actions] loadOwnStart');
export const loadOwnSuccess = createAction(
  '[Users Actions] loadOwnSuccess',
  props<{ result: User }>()
);
export const loadOwnFailure = createAction(
  '[Users Actions] loadOwnFailure',
  props<{ error: string }>()
);

import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/user.interface';

export const loadOwnStart = createAction('[Users Actions] load own start');
export const loadOwnSuccess = createAction(
  '[Users Api Actions] load own success',
  props<{ result: User }>()
);
export const loadOwnFailure = createAction(
  '[Users Api Actions] load own failure',
  props<{ error: string }>()
);

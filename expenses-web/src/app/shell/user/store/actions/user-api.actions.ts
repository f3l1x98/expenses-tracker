import { createAction, props } from '@ngrx/store';
import { User } from '../../api/interfaces/user.interface';

export const loadOwnStart = createAction('[User Actions] load own start');
export const loadOwnSuccess = createAction(
  '[User Api Actions] load own success',
  props<{ result: User }>()
);
export const loadOwnFailure = createAction(
  '[User Api Actions] load own failure',
  props<{ error: string }>()
);

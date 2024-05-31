import { createAction, props } from '@ngrx/store';
import { Expense } from './interfaces/expense.interface';

export const loadStart = createAction('[Expenses Actions] load start');
export const loadSuccess = createAction(
  '[Expenses Actions] load success',
  props<{ result: Expense[] }>()
);
export const loadFailure = createAction(
  '[Expenses Actions] load failure',
  props<{ error: string }>()
);

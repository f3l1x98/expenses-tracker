import { createAction, props } from '@ngrx/store';
import { Expense } from '../../api/interfaces/expense.interface';
import { CreateExpenseRequest } from '../../api/interfaces/requests/create-expense-request.interface';

export const loadStart = createAction('[Expenses Api Actions] load start');
export const loadSuccess = createAction(
  '[Expenses Api Actions] load success',
  props<{ result: Expense[] }>()
);
export const loadFailure = createAction(
  '[Expenses Api Actions] load failure',
  props<{ error: string }>()
);

export const createStart = createAction(
  '[Expenses Api Actions] create start',
  props<{ request: CreateExpenseRequest }>()
);
export const createSuccess = createAction(
  '[Expenses Api Actions] create success',
  props<{ result: Expense }>()
);
export const createFailure = createAction(
  '[Expenses Api Actions] create failure',
  props<{ error: string }>()
);

export const deleteStart = createAction(
  '[Expenses Api Actions] delete start',
  props<{ id: string }>()
);
export const deleteSuccess = createAction(
  '[Expenses Api Actions] delete success'
);
export const deleteFailure = createAction(
  '[Expenses Api Actions] delete failure',
  props<{ error: string }>()
);

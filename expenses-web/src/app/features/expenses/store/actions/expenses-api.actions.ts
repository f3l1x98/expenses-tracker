import { createAction, props } from '@ngrx/store';
import { Expense } from '../../api/interfaces/expense.interface';
import { CreateExpenseRequest } from '../../api/interfaces/requests/create-expense-request.interface';

export const loadStart = createAction('[Expenses Actions] load start');
export const loadSuccess = createAction(
  '[Expenses Actions] load success',
  props<{ result: Expense[] }>()
);
export const loadFailure = createAction(
  '[Expenses Actions] load failure',
  props<{ error: string }>()
);

export const createStart = createAction(
  '[Expenses Actions] create start',
  props<{ request: CreateExpenseRequest }>()
);
export const createSuccess = createAction('[Expenses Actions] create success');
export const createFailure = createAction(
  '[Expenses Actions] create failure',
  props<{ error: string }>()
);

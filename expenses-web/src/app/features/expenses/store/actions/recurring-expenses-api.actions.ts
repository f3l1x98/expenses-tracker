import { createAction, props } from '@ngrx/store';
import { RecurringExpense } from '../../api/interfaces/recurring-expense.interface';
import { CreateRecurringExpenseRequest } from '../../api/interfaces/requests/create-recurring-expense-request.interface';

export const loadStart = createAction(
  '[Recurring Expenses Actions] load start'
);
export const loadSuccess = createAction(
  '[Recurring Expenses Actions] load success',
  props<{ result: RecurringExpense[] }>()
);
export const loadFailure = createAction(
  '[Recurring Expenses Actions] load failure',
  props<{ error: string }>()
);

export const createStart = createAction(
  '[Recurring Expenses Actions] create start',
  props<{ request: CreateRecurringExpenseRequest }>()
);
export const createSuccess = createAction(
  '[Recurring Expenses Actions] create success'
);
export const createFailure = createAction(
  '[Recurring Expenses Actions] create failure',
  props<{ error: string }>()
);

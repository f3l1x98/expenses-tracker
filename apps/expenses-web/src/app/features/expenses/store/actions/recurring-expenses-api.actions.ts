import { createAction, props } from '@ngrx/store';
import { RecurringExpense } from '../../api/interfaces/recurring-expense.interface';
import { CreateRecurringExpenseRequest } from '../../api/interfaces/requests/create-recurring-expense-request.interface';

export const loadStart = createAction(
  '[Recurring Expenses Api Actions] load start',
);
export const loadSuccess = createAction(
  '[Recurring Expenses Api Actions] load success',
  props<{ result: RecurringExpense[] }>(),
);
export const loadFailure = createAction(
  '[Recurring Expenses Api Actions] load failure',
  props<{ error: string }>(),
);

export const createStart = createAction(
  '[Recurring Expenses Api Actions] create start',
  props<{ request: CreateRecurringExpenseRequest }>(),
);
export const createSuccess = createAction(
  '[Recurring Expenses Api Actions] create success',
  props<{ result: RecurringExpense }>(),
);
export const createFailure = createAction(
  '[Recurring Expenses Api Actions] create failure',
  props<{ error: string }>(),
);

export const deleteStart = createAction(
  '[Recurring Expenses Api Actions] delete start',
  props<{ id: string }>(),
);
export const deleteSuccess = createAction(
  '[Recurring Expenses Api Actions] delete success',
);
export const deleteFailure = createAction(
  '[Recurring Expenses Api Actions] delete failure',
  props<{ error: string }>(),
);

import { createAction, props } from '@ngrx/store';
import { ICreateRecurringExpenseDto, IRecurringExpense } from 'expenses-shared';

export const loadStart = createAction(
  '[Recurring Expenses Api Actions] load start',
);
export const loadSuccess = createAction(
  '[Recurring Expenses Api Actions] load success',
  props<{ result: IRecurringExpense[] }>(),
);
export const loadFailure = createAction(
  '[Recurring Expenses Api Actions] load failure',
  props<{ error: string }>(),
);

export const createStart = createAction(
  '[Recurring Expenses Api Actions] create start',
  props<{ request: ICreateRecurringExpenseDto }>(),
);
export const createSuccess = createAction(
  '[Recurring Expenses Api Actions] create success',
  props<{ result: IRecurringExpense }>(),
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

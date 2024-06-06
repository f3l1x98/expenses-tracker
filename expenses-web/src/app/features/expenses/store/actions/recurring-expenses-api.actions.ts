import { createAction, props } from '@ngrx/store';
import { RecurringExpense } from '../../api/interfaces/recurring-expense.interface';

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

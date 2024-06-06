import { createAction, props } from '@ngrx/store';
import { RecurringIncome } from '../../api/interfaces/recurring-income.interface';

export const loadStart = createAction('[Recurring Incomes Actions] load start');
export const loadSuccess = createAction(
  '[Recurring Incomes Actions] load success',
  props<{ result: RecurringIncome[] }>()
);
export const loadFailure = createAction(
  '[Recurring Incomes Actions] load failure',
  props<{ error: string }>()
);

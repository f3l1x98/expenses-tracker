import { createAction, props } from '@ngrx/store';
import { RecurringIncome } from '../../api/interfaces/recurring-income.interface';
import { CreateRecurringIncomeRequest } from '../../api/interfaces/requests/create-recurring-income-request.interface';

export const loadStart = createAction('[Recurring Incomes Actions] load start');
export const loadSuccess = createAction(
  '[Recurring Incomes Actions] load success',
  props<{ result: RecurringIncome[] }>()
);
export const loadFailure = createAction(
  '[Recurring Incomes Actions] load failure',
  props<{ error: string }>()
);

export const createStart = createAction(
  '[Recurring Incomes Actions] create start',
  props<{ request: CreateRecurringIncomeRequest }>()
);
export const createSuccess = createAction(
  '[Recurring Incomes Actions] create success',
  props<{ result: RecurringIncome }>()
);
export const createFailure = createAction(
  '[Recurring Incomes Actions] create failure',
  props<{ error: string }>()
);

export const deleteStart = createAction(
  '[Recurring Incomes Actions] delete start',
  props<{ id: string }>()
);
export const deleteSuccess = createAction(
  '[Recurring Incomes Actions] delete success'
);
export const deleteFailure = createAction(
  '[Recurring Incomes Actions] delete failure',
  props<{ error: string }>()
);

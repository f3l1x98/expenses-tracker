import { createAction, props } from '@ngrx/store';
import { ICreateRecurringIncomeDto, IRecurringIncome } from 'expenses-shared';

export const loadStart = createAction(
  '[Recurring Incomes Api Actions] load start',
);
export const loadSuccess = createAction(
  '[Recurring Incomes Api Actions] load success',
  props<{ result: IRecurringIncome[] }>(),
);
export const loadFailure = createAction(
  '[Recurring Incomes Api Actions] load failure',
  props<{ error: string }>(),
);

export const createStart = createAction(
  '[Recurring Incomes Api Actions] create start',
  props<{ request: ICreateRecurringIncomeDto }>(),
);
export const createSuccess = createAction(
  '[Recurring Incomes Api Actions] create success',
  props<{ result: IRecurringIncome }>(),
);
export const createFailure = createAction(
  '[Recurring Incomes Api Actions] create failure',
  props<{ error: string }>(),
);

export const deleteStart = createAction(
  '[Recurring Incomes Api Actions] delete start',
  props<{ id: string }>(),
);
export const deleteSuccess = createAction(
  '[Recurring Incomes Api Actions] delete success',
);
export const deleteFailure = createAction(
  '[Recurring Incomes Api Actions] delete failure',
  props<{ error: string }>(),
);

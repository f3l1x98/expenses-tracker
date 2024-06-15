import { createAction, props } from '@ngrx/store';
import { CreateIncomeRequest } from '../../api/interfaces/requests/create-income-request.interface';
import { IIncome } from 'expenses-shared';

export const loadStart = createAction('[Incomes Api Actions] load start');
export const loadSuccess = createAction(
  '[Incomes Api Actions] load success',
  props<{ result: IIncome[] }>(),
);
export const loadFailure = createAction(
  '[Incomes Api Actions] load failure',
  props<{ error: string }>(),
);

export const createStart = createAction(
  '[Incomes Api Actions] create start',
  props<{ request: CreateIncomeRequest }>(),
);
export const createSuccess = createAction(
  '[Incomes Api Actions] create success',
  props<{ result: IIncome }>(),
);
export const createFailure = createAction(
  '[Incomes Api Actions] create failure',
  props<{ error: string }>(),
);

export const deleteStart = createAction(
  '[Incomes Api Actions] delete start',
  props<{ id: string }>(),
);
export const deleteSuccess = createAction(
  '[Incomes Api Actions] delete success',
);
export const deleteFailure = createAction(
  '[Incomes Api Actions] delete failure',
  props<{ error: string }>(),
);

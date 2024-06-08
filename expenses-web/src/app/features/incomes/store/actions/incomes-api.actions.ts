import { createAction, props } from '@ngrx/store';
import { Income } from '../../api/interfaces/income.interface';
import { CreateIncomeRequest } from '../../api/interfaces/requests/create-income-request.interface';

export const loadStart = createAction('[Incomes Actions] load start');
export const loadSuccess = createAction(
  '[Incomes Actions] load success',
  props<{ result: Income[] }>()
);
export const loadFailure = createAction(
  '[Incomes Actions] load failure',
  props<{ error: string }>()
);

export const createStart = createAction(
  '[Incomes Actions] create start',
  props<{ request: CreateIncomeRequest }>()
);
export const createSuccess = createAction(
  '[Incomes Actions] create success',
  props<{ result: Income }>()
);
export const createFailure = createAction(
  '[Incomes Actions] create failure',
  props<{ error: string }>()
);

export const deleteStart = createAction(
  '[Incomes Actions] delete start',
  props<{ id: string }>()
);
export const deleteSuccess = createAction('[Incomes Actions] delete success');
export const deleteFailure = createAction(
  '[Incomes Actions] delete failure',
  props<{ error: string }>()
);

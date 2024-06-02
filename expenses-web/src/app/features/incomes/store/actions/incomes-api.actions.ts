import { createAction, props } from '@ngrx/store';
import { Income } from '../interfaces/income.interface';

export const loadStart = createAction('[Incomes Actions] load start');
export const loadSuccess = createAction(
  '[Incomes Actions] load success',
  props<{ result: Income[] }>()
);
export const loadFailure = createAction(
  '[Incomes Actions] load failure',
  props<{ error: string }>()
);

import { createAction, props } from '@ngrx/store';
import {
  ICreateExpenseDto,
  IExpense,
  IUpdateExpenseDto,
} from 'expenses-shared';

export const loadStart = createAction('[Expenses Api Actions] load start');
export const loadSuccess = createAction(
  '[Expenses Api Actions] load success',
  props<{ result: IExpense[] }>(),
);
export const loadFailure = createAction(
  '[Expenses Api Actions] load failure',
  props<{ error: string }>(),
);

export const createStart = createAction(
  '[Expenses Api Actions] create start',
  props<{ request: ICreateExpenseDto }>(),
);
export const createSuccess = createAction(
  '[Expenses Api Actions] create success',
  props<{ result: IExpense }>(),
);
export const createFailure = createAction(
  '[Expenses Api Actions] create failure',
  props<{ error: string }>(),
);

export const updateStart = createAction(
  '[Expenses Api Actions] update start',
  props<{ id: string; request: IUpdateExpenseDto }>(),
);
export const updateSuccess = createAction(
  '[Expenses Api Actions] update success',
  props<{ result: IExpense }>(),
);
export const updateFailure = createAction(
  '[Expenses Api Actions] update failure',
  props<{ id: string; error: string }>(),
);

export const deleteStart = createAction(
  '[Expenses Api Actions] delete start',
  props<{ id: string }>(),
);
export const deleteSuccess = createAction(
  '[Expenses Api Actions] delete success',
);
export const deleteFailure = createAction(
  '[Expenses Api Actions] delete failure',
  props<{ error: string }>(),
);

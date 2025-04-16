import { createAction, props } from '@ngrx/store';
import {
  ICreateExpenseDto,
  IExpenseFilterDto,
  IUpdateExpenseDto,
} from 'expenses-shared';

export const createRequest = createAction(
  '[Expense Page Actions] create request',
  props<{ request: ICreateExpenseDto }>(),
);
export const updateRequest = createAction(
  '[Expense Page Actions] update request',
  props<{ id: string; request: IUpdateExpenseDto }>(),
);
export const toggleIsEdit = createAction(
  '[Expense Page Actions] toggle isEdit',
  props<{ id: string }>(),
);
export const deleteRequest = createAction(
  '[Expense Page Actions] delete request',
  props<{ id: string }>(),
);
export const updateFilter = createAction(
  '[Expense Page Actions] update filter',
  props<{ filter: IExpenseFilterDto }>(),
);

import { createAction, props } from '@ngrx/store';
import { ICreateExpenseDto, IFilterDto } from 'expenses-shared';

export const createRequest = createAction(
  '[Expense Page Actions] create request',
  props<{ request: ICreateExpenseDto }>(),
);
export const deleteRequest = createAction(
  '[Expense Page Actions] delete request',
  props<{ id: string }>(),
);
export const updateFilter = createAction(
  '[Expense Page Actions] update filter',
  props<{ filter: IFilterDto }>(),
);

import { createAction, props } from '@ngrx/store';
import {
  ICreateRecurringExpenseDto,
  IRecurringExpenseFilterDto,
} from 'expenses-shared';

export const createRequest = createAction(
  '[Recurring Expense Page Actions] create request',
  props<{ request: ICreateRecurringExpenseDto }>(),
);
export const deleteRequest = createAction(
  '[Recurring Expense Page Actions] delete request',
  props<{ id: string }>(),
);
export const updateFilter = createAction(
  '[Recurring Expense Page Actions] update filter',
  props<{ filter: IRecurringExpenseFilterDto }>(),
);

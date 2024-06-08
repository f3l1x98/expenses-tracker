import { createAction, props } from '@ngrx/store';
import { CreateRecurringExpenseRequest } from '../../api/interfaces/requests/create-recurring-expense-request.interface';

export const createRequest = createAction(
  '[Recurring Expense User Actions] create request',
  props<{ request: CreateRecurringExpenseRequest }>()
);
export const deleteRequest = createAction(
  '[Recurring Expense User Actions] delete request',
  props<{ id: string }>()
);

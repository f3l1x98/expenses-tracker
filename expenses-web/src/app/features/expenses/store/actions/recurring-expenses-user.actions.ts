import { createAction, props } from '@ngrx/store';
import { CreateRecurringExpenseRequest } from '../../api/interfaces/requests/create-recurring-expense-request.interface';

export const createRequest = createAction(
  '[Recurring Expense User Actions] create request',
  props<{ request: CreateRecurringExpenseRequest }>()
);

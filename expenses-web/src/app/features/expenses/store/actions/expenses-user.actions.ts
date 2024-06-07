import { createAction, props } from '@ngrx/store';
import { CreateExpenseRequest } from '../../api/interfaces/requests/create-expense-request.interface';

export const createRequest = createAction(
  '[Expense User Actions] create request',
  props<{ request: CreateExpenseRequest }>()
);

import { createAction, props } from '@ngrx/store';
import { CreateRecurringIncomeRequest } from '../../api/interfaces/requests/create-recurring-income-request.interface';

export const createRequest = createAction(
  '[Recurring Income User Actions] create request',
  props<{ request: CreateRecurringIncomeRequest }>()
);
export const deleteRequest = createAction(
  '[Recurring Income User Actions] delete request',
  props<{ id: string }>()
);

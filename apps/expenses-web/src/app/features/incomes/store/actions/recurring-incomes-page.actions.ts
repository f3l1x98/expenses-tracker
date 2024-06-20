import { createAction, props } from '@ngrx/store';
import { ICreateRecurringIncomeDto } from 'expenses-shared';

export const createRequest = createAction(
  '[Recurring Income Page Actions] create request',
  props<{ request: ICreateRecurringIncomeDto }>(),
);
export const deleteRequest = createAction(
  '[Recurring Income Page Actions] delete request',
  props<{ id: string }>(),
);

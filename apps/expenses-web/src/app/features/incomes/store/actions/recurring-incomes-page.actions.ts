import { createAction, props } from '@ngrx/store';
import {
  ICreateRecurringIncomeDto,
  IRecurringIncomeFilterDto,
} from 'expenses-shared';

export const createRequest = createAction(
  '[Recurring Income Page Actions] create request',
  props<{ request: ICreateRecurringIncomeDto }>(),
);
export const deleteRequest = createAction(
  '[Recurring Income Page Actions] delete request',
  props<{ id: string }>(),
);
export const updateFilter = createAction(
  '[Recurring Income Page Actions] update filter',
  props<{ filter: IRecurringIncomeFilterDto }>(),
);

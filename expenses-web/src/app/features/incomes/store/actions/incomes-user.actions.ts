import { createAction, props } from '@ngrx/store';
import { CreateIncomeRequest } from '../../api/interfaces/requests/create-income-request.interface';

export const createRequest = createAction(
  '[Income User Actions] create request',
  props<{ request: CreateIncomeRequest }>()
);
export const deleteRequest = createAction(
  '[Income User Actions] delete request',
  props<{ id: string }>()
);

import { createAction, props } from '@ngrx/store';
import { ICreateIncomeDto } from 'expenses-shared';

export const createRequest = createAction(
  '[Income Page Actions] create request',
  props<{ request: ICreateIncomeDto }>(),
);
export const deleteRequest = createAction(
  '[Income Page Actions] delete request',
  props<{ id: string }>(),
);

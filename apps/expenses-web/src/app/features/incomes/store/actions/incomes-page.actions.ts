import { createAction, props } from '@ngrx/store';
import { ICreateIncomeDto, IIncomeFilterDto } from 'expenses-shared';

export const createRequest = createAction(
  '[Income Page Actions] create request',
  props<{ request: ICreateIncomeDto }>(),
);
export const deleteRequest = createAction(
  '[Income Page Actions] delete request',
  props<{ id: string }>(),
);
export const updateFilter = createAction(
  '[Income Page Actions] update filter',
  props<{ filter: IIncomeFilterDto }>(),
);

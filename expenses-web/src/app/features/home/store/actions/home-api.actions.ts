import { createAction, props } from '@ngrx/store';
import { ExpensesPerCategoryResponse } from '../../api/interfaces/expenses-per-catergory-response.interface';
import { CurrentMonthData } from '../../api/interfaces/current-month-data.interface';
import { ExpensesPerMonthResponse } from '../../api/interfaces/expenses-per-month-response.interface';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';

export interface HomeLoadSuccessResult {
  currentMonthData: CurrentMonthData;
  expensesPerCategory: ExpensesPerCategoryResponse;
  expensesPerMonth: ExpensesPerMonthResponse;
}

export const loadStart = createAction(
  '[Home Actions] load start',
  props<{ filter: DateRange }>()
);
// TODO perhaps split into multiple load actions?!?!
export const loadSuccess = createAction(
  '[Home Actions] load success',
  props<{ result: HomeLoadSuccessResult }>()
);
export const loadFailure = createAction(
  '[Home Actions] load failure',
  props<{ error: string }>()
);

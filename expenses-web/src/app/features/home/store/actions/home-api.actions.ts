import { createAction, props } from '@ngrx/store';
import { ExpensesPerCategoryResponse } from '../../api/interfaces/expenses-per-catergory-response.interface';
import { CurrentMonthData } from '../../api/interfaces/current-month-data.interface';
import { ExpensesPerMonthResponse } from '../../api/interfaces/expenses-per-month-response.interface';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';

export const currentMonthDataLoadStart = createAction(
  '[Home Api Actions] currentMonthData load start'
);
export const currentMonthDataLoadSuccess = createAction(
  '[Home Api Actions] currentMonthData load success',
  props<{ result: CurrentMonthData }>()
);
export const currentMonthDataLoadFailure = createAction(
  '[Home Api Actions] currentMonthData load failure',
  props<{ error: string }>()
);

export const expensesPerCategoryLoadStart = createAction(
  '[Home Api Actions] expensesPerCategory load start',
  props<{ filter: DateRange }>()
);
export const expensesPerCategoryLoadSuccess = createAction(
  '[Home Api Actions] expensesPerCategory load success',
  props<{ result: ExpensesPerCategoryResponse }>()
);
export const expensesPerCategoryLoadFailure = createAction(
  '[Home Api Actions] expensesPerCategory load failure',
  props<{ error: string }>()
);

export const expensesPerMonthLoadStart = createAction(
  '[Home Api Actions] expensesPerMonth load start',
  props<{ filter: DateRange }>()
);
export const expensesPerMonthLoadSuccess = createAction(
  '[Home Api Actions] expensesPerMonth load success',
  props<{ result: ExpensesPerMonthResponse }>()
);
export const expensesPerMonthLoadFailure = createAction(
  '[Home Api Actions] expensesPerMonth load failure',
  props<{ error: string }>()
);

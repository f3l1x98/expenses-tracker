import { createAction, props } from '@ngrx/store';
import { ExpensesPerCategoryResponse } from '../../api/interfaces/expenses-per-catergory-response.interface';
import { CurrentMonthData } from '../../api/interfaces/current-month-data.interface';
import { ExpensesPerMonthResponse } from '../../api/interfaces/expenses-per-month-response.interface';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';

export const currentMonthDataLoadStart = createAction(
  '[Home Actions] currentMonthDataLoadStart'
);
export const currentMonthDataLoadSuccess = createAction(
  '[Home Actions] currentMonthDataLoadSuccess',
  props<{ result: CurrentMonthData }>()
);
export const currentMonthDataLoadFailure = createAction(
  '[Home Actions] currentMonthDataLoadFailure',
  props<{ error: string }>()
);

export const expensesPerCategoryLoadStart = createAction(
  '[Home Actions] expensesPerCategoryLoadStart',
  props<{ filter: DateRange }>()
);
export const expensesPerCategoryLoadSuccess = createAction(
  '[Home Actions] expensesPerCategoryLoadSuccess',
  props<{ result: ExpensesPerCategoryResponse }>()
);
export const expensesPerCategoryLoadFailure = createAction(
  '[Home Actions] expensesPerCategoryLoadFailure',
  props<{ error: string }>()
);

export const expensesPerMonthLoadStart = createAction(
  '[Home Actions] expensesPerMonthLoadStart',
  props<{ filter: DateRange }>()
);
export const expensesPerMonthLoadSuccess = createAction(
  '[Home Actions] expensesPerMonthLoadSuccess',
  props<{ result: ExpensesPerMonthResponse }>()
);
export const expensesPerMonthLoadFailure = createAction(
  '[Home Actions] expensesPerMonthLoadFailure',
  props<{ error: string }>()
);

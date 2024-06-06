import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { ExpensesPerCategoryResponse } from '../../api/interfaces/expenses-per-catergory-response.interface';
import { ExpensesPerMonthResponse } from '../../api/interfaces/expenses-per-month-response.interface';
import { CurrentMonthData } from '../../api/interfaces/current-month-data.interface';
import { DateRange } from './date-range.interface';

export interface HomeState {
  filter: DateRange;
  currentMonthData: CurrentMonthData | undefined;
  expensesPerCategory: ExpensesPerCategoryResponse | undefined;
  expensesPerMonth: ExpensesPerMonthResponse | undefined;
  status: StoreStateStatus;
}

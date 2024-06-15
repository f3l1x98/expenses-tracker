import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';
import {
  CurrentMonthDataDto,
  ExpensesPerCategoryResponse,
  ExpensesPerMonthResponse,
} from 'expenses-shared';

export interface HomeState {
  filter: DateRange;
  currentMonthData: {
    data: CurrentMonthDataDto | undefined;
    status: StoreStateStatus;
  };
  expensesPerCategory: {
    data: ExpensesPerCategoryResponse | undefined;
    status: StoreStateStatus;
  };
  expensesPerMonth: {
    data: ExpensesPerMonthResponse | undefined;
    status: StoreStateStatus;
  };
}

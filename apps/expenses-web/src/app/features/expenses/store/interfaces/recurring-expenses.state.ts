import { IRecurringExpense, IRecurringExpenseFilterDto } from 'expenses-shared';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export interface RecurringExpensesState {
  recurringExpenses: Array<IRecurringExpense>;
  filter: IRecurringExpenseFilterDto;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  deleteStatus: StoreStateStatus;
}

import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { RecurringExpense } from '../../api/interfaces/recurring-expense.interface';

export interface RecurringExpensesState {
  recurringExpenses: Array<RecurringExpense>;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  deleteStatus: StoreStateStatus;
}

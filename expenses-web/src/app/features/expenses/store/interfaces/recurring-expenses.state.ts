import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { RecurringExpense } from './recurring-expense.interface';

export interface RecurringExpensesState {
  recurringExpenses: Array<RecurringExpense>;
  status: StoreStateStatus;
}

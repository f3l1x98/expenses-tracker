import { IRecurringExpense } from 'expenses-shared';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export interface RecurringExpensesState {
  recurringExpenses: Array<IRecurringExpense>;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  deleteStatus: StoreStateStatus;
}

import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { Expense } from './expense.interface';

export interface ExpensesState {
  expenses: Array<Expense>;
  status: StoreStateStatus;
}

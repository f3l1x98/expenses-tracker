import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { Expense } from '../../api/interfaces/expense.interface';

export interface ExpensesState {
  expenses: Array<Expense>;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
}

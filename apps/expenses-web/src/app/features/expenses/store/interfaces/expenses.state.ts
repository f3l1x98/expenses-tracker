import { IExpense, IExpenseFilterDto } from 'expenses-shared';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export interface ExpensesState {
  expenses: Array<IExpense>;
  filter: IExpenseFilterDto;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  deleteStatus: StoreStateStatus;
}

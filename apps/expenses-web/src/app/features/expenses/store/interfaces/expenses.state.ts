import { IExpense, IExpenseFilterDto } from 'expenses-shared';
import {
  StoreStateStatus,
  UpdateStoreStateStatus,
} from '../../../../shared/interfaces/store-state-status.interface';

export interface ExpensesState {
  expenses: Array<IExpense>;
  filter: IExpenseFilterDto;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  updateStatus: UpdateStoreStateStatus;
  deleteStatus: StoreStateStatus;
}

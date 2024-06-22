import { IExpense, IFilterDto } from 'expenses-shared';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export interface ExpensesState {
  expenses: Array<IExpense>;
  filter: IFilterDto;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  deleteStatus: StoreStateStatus;
}

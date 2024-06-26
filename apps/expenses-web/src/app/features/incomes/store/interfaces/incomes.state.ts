import { IIncome, IIncomeFilterDto } from 'expenses-shared';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export interface IncomesState {
  incomes: IIncome[];
  filter: IIncomeFilterDto;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  deleteStatus: StoreStateStatus;
}

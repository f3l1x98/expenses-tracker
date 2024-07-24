import { IRecurringIncome, IRecurringIncomeFilterDto } from 'expenses-shared';
import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';

export interface RecurringIncomesState {
  recurringIncomes: IRecurringIncome[];
  filter: IRecurringIncomeFilterDto;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  deleteStatus: StoreStateStatus;
}

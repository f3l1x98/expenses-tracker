import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { RecurringIncome } from '../../api/interfaces/recurring-income.interface';

export interface RecurringIncomesState {
  recurringIncomes: RecurringIncome[];
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
}

import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { RecurringIncome } from './recurring-income.interface';

export interface RecurringIncomesState {
  recurringIncomes: RecurringIncome[];
  status: StoreStateStatus;
}

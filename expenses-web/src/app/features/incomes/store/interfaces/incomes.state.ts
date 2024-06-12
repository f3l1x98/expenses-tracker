import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { Income } from '../../api/interfaces/income.interface';

export interface IncomesState {
  incomes: Income[];
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
  deleteStatus: StoreStateStatus;
}

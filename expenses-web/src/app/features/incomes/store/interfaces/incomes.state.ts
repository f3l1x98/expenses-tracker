import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { Income } from './income.interface';

export interface IncomesState {
  incomes: Income[];
  status: StoreStateStatus;
}

import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { User } from './user.interface';

export interface UsersState {
  own: User | undefined;
  loadStatus: StoreStateStatus;
}

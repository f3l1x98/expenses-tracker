import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { User } from '../../api/interfaces/user.interface';

export interface UserState {
  own: User | undefined;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
}

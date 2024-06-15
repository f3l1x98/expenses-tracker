import { StoreStateStatus } from '../../../../shared/interfaces/store-state-status.interface';
import { IUser } from 'expenses-shared';

export interface UserState {
  own: IUser | undefined;
  loadStatus: StoreStateStatus;
  createStatus: StoreStateStatus;
}

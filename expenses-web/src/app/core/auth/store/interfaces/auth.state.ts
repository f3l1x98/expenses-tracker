import { User } from '../../../../shared/interfaces/user.interface';

export interface AuthState {
  user: User | undefined;
  status: AuthStatus;
  token: string | undefined;
}

export interface AuthStatus {
  error: string | undefined;
  value: 'pending' | 'running' | 'success' | 'failure';
}

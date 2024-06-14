import { AuthUser } from './auth-user.interface';

export interface AuthState {
  user: AuthUser | undefined;
  status: AuthStatus;
  token: string | undefined;
}

export interface AuthStatus {
  error: string | undefined;
  value: 'pending' | 'running' | 'success' | 'failure';
}

import { AuthUser } from '../../store/interfaces/auth-user.interface';

export interface UserLoginResponse {
  message: string;
  token?: string;
  user?: AuthUser;
}

import { User } from '../../../../shared/interfaces/user.interface';

export interface UserLoginResponse {
  message: string;
  token?: string;
  user?: User;
}

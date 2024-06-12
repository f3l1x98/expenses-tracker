import { AuthUser } from '../../../../core/auth/store/interfaces/auth-user.interface';
import { UserSettings } from './user-settings.interface';

export interface User extends AuthUser {
  settings: UserSettings;
}

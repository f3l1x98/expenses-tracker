import { UserSettings } from '../user-settings.interface';

export interface CreateUserRequest {
  username: string;
  password: string;
  settings: UserSettings;
}

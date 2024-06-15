import { IUserSettings } from 'expenses-shared';

export interface CreateUserRequest {
  username: string;
  password: string;
  settings: IUserSettings;
}

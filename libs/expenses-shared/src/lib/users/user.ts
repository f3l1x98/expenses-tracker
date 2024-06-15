import { IUserSettings } from './user-settings';

export interface IUser {
  id: string;
  username: string;
  settings: IUserSettings;
}

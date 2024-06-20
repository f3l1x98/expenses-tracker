import { IUserSettings } from '../user-settings';

export interface ICreateUserDto {
  username: string;
  password: string;
  settings: IUserSettings;
}

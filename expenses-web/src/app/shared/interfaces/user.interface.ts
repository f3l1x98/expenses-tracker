import { UserSettings } from './user-settings.interface';

export interface User {
  id: string;
  username: string;
  settings: UserSettings;
}

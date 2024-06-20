import { IUser } from '../user';

export interface ILoginUserResponse {
  message: string;
  user?: Pick<IUser, 'id' | 'username'>;
  token?: string;
}

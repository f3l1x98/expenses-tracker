import { IUser } from 'expenses-shared';

export type AuthUser = Pick<IUser, 'id' | 'username'>;

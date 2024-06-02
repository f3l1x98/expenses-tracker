import { User } from '../../../../shared/interfaces/user.interface';
import { RecurringIncome } from './recurring-income.interface';

export interface Income {
  id: string;
  description: string;
  amount: number;
  category: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  recurringIncome?: RecurringIncome;
}

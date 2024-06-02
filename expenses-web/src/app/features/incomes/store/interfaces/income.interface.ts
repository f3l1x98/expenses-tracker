import { Price } from '../../../../shared/interfaces/price.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { RecurringIncome } from './recurring-income.interface';

export interface Income {
  id: string;
  description: string;
  price: Price;
  category: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  recurringIncome?: RecurringIncome;
}

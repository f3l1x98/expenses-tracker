import { User } from '../../../../shell/user/api/interfaces/user.interface';
import { IncomeCategory } from './income-category';
import { RecurringIncome } from './recurring-income.interface';

export interface Income {
  id: string;
  description: string;
  amount: number;
  category: IncomeCategory;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  recurringIncome?: RecurringIncome;
}

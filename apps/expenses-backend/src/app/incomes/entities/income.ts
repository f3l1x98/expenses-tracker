import { IRecurringIncome } from '../../recurring-incomes/entities/recurring-income';
import { IUser } from '../../users/entities/user';
import { IncomeCategory } from './income-category';

export interface IIncome {
  id: string;
  description: string;
  amount: number;
  category: IncomeCategory;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  recurringIncome?: IRecurringIncome;
}

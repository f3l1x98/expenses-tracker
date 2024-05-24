import { IncomeCategory } from './income-category';
import { IRecurringIncome } from 'src/app/recurring-incomes/entities/recurring-income';
import { IUser } from 'src/app/users/entities/user';

export interface IIncome {
  id: string;
  amount: number;
  category: IncomeCategory;
  user: IUser;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  recurringIncome?: IRecurringIncome;
}

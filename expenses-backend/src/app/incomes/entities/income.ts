import { IncomeCategory } from './income-category';
import { IRecurringIncome } from 'src/app/recurring-incomes/entities/recurring-income';
import { IPrice } from 'src/app/shared/prices/price';
import { IUser } from 'src/app/users/entities/user';

export interface IIncome {
  id: string;
  price: IPrice;
  category: IncomeCategory;
  user: IUser;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  recurringIncome?: IRecurringIncome;
}

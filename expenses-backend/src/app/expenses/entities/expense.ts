import { ExpenseCategory } from './expense-category';
import { IRecurringExpense } from 'src/app/recurring-expenses/entities/recurring-expense';
import { IPrice } from 'src/app/shared/prices/price';
import { IUser } from 'src/app/users/entities/user';

export interface IExpense {
  id: string;
  //amount: number;
  price: IPrice;
  category: ExpenseCategory;
  user: IUser;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  recurringExpense?: IRecurringExpense;
}

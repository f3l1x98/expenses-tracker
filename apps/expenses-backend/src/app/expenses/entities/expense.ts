import { IRecurringExpense } from '../../recurring-expenses/entities/recurring-expense';
import { IUser } from '../../users/entities/user';
import { ExpenseCategory } from './expense-category';

export interface IExpense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  recurringExpense?: IRecurringExpense;
}

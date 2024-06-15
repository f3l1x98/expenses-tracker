import { IRecurringExpense } from '../recurring-expenses/recurring-expense';
import { IUser } from '../users/user';
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

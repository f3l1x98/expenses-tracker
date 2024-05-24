import { ExpenseCategory } from './expense-category';
import { IRecurringExpense } from 'src/app/recurring-expenses/entities/recurring-expense';
import { IUser } from 'src/app/users/entities/user';

export interface IExpense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  user: IUser;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  recurringExpense?: IRecurringExpense;
}

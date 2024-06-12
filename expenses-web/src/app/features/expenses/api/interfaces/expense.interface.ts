import { User } from '../../../../shell/user/api/interfaces/user.interface';
import { ExpenseCategory } from './expense-category';
import { RecurringExpense } from './recurring-expense.interface';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  recurringExpense?: RecurringExpense;
}

import { User } from '../../../../shared/interfaces/user.interface';
import { RecurringExpense } from './recurring-expense.interface';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  recurringExpense?: RecurringExpense;
}

import { ExpenseCategory } from '../expense-category';

export interface CreateExpenseRequest {
  description: string;

  amount: number;

  category: ExpenseCategory;
}

import { ExpenseCategory } from 'expenses-shared';

export interface CreateExpenseRequest {
  description: string;

  amount: number;

  category: ExpenseCategory;
}

import { ExpenseCategory } from '../expense-category';

export interface CreateRecurringExpenseRequest {
  description: string;

  amount: number;

  category: ExpenseCategory;

  cron: string;

  startDate: Date;

  endDate?: Date;
}

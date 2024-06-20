import { ExpenseCategory } from '../expense-category';

export interface ICreateExpenseDto {
  description: string;
  amount: number;
  category: ExpenseCategory;
}

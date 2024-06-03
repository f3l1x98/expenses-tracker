import { TotalExpenseOfCategory } from '../total-expense-of-category.interface';

export interface ExpensesPerCategoryResponse {
  data: TotalExpenseOfCategory[];
  currency: string;
}

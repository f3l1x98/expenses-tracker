import { TotalExpenseOfCategoryDto } from './total-expense-of-category.dto';

export interface ExpensesPerCategoryResponse {
  data: TotalExpenseOfCategoryDto[];
  currency: string;
}

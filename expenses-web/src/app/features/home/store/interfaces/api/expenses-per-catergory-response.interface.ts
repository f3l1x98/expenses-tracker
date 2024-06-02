import { ExpensesPerCategoryData } from '../expenses-per-category.interface';

export interface ExpensesPerCategoryResponse {
  data: ExpensesPerCategoryData[];
  currency: string;
}

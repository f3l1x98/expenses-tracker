import { ExpenseCategory } from '../expenses';

export interface IHouseholdExpensePerCategory {
  category: ExpenseCategory;
  monthlyAmount: number;
  quarterlyAmount: number;
  yearlyAmount: number;
}

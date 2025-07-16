import { ExpenseCategory } from '../expenses';
import { IntervalAmounts } from './interval-amounts';

export interface IHouseholdExpensePerCategory extends IntervalAmounts {
  category: ExpenseCategory;
}

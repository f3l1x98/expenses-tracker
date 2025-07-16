import { IntervalAmounts } from './interval-amounts';
import { IHouseholdExpensePerCategory } from './household-expense-per-category';

export interface IHouseholdOverview {
  expensesPerCategory: Array<IHouseholdExpensePerCategory>;
  totalExpense: IntervalAmounts;
  totalIncome: IntervalAmounts;
  currency: string;
}

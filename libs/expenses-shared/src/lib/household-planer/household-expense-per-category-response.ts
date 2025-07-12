import { IHouseholdExpensePerCategory } from './household-expense-per-category';

export interface IHouseholdExpensePerCategoryResponse {
  data: Array<IHouseholdExpensePerCategory>;
  currency: string;
}

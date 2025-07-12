import { IHouseholdIncomePerCategory } from './household-income-per-category';

export interface IHouseholdIncomePerCategoryResponse {
  data: Array<IHouseholdIncomePerCategory>;
  currency: string;
}

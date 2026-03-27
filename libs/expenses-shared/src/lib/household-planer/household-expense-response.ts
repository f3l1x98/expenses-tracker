import { IHouseholdExpense } from './household-expense';

export interface IHouseholdExpenseResponse {
  data: Array<IHouseholdExpense>;
  currency: string;
}

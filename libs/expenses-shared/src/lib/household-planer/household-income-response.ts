import { IHouseholdIncome } from './household-income';

export interface IHouseholdIncomeResponse {
  data: Array<IHouseholdIncome>;
  currency: string;
}

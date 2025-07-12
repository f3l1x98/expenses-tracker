import { IncomeCategory } from '../incomes';

export interface IHouseholdIncomePerCategory {
  category: IncomeCategory;
  monthlyAmount: number;
  quarterlyAmount: number;
  yearlyAmount: number;
}

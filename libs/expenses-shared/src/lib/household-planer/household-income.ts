import { IncomeCategory } from '../incomes';
import { RecurringType } from '../shared';

export interface IHouseholdIncome {
  description: string;
  amount: number;
  category: IncomeCategory;
  recurringType: RecurringType;
  monthlyAmount: number;
  quarterlyAmount: number;
  yearlyAmount: number;
}

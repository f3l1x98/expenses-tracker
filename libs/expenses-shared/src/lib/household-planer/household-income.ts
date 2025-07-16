import { IncomeCategory } from '../incomes';
import { RecurringType } from '../shared';
import { IntervalAmounts } from './interval-amounts';

export interface IHouseholdIncome extends IntervalAmounts {
  description: string;
  amount: number;
  category: IncomeCategory;
  recurringType: RecurringType;
}

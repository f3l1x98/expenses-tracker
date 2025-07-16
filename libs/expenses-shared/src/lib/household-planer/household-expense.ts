import { ExpenseCategory } from '../expenses';
import { RecurringType } from '../shared';
import { IntervalAmounts } from './interval-amounts';

export interface IHouseholdExpense extends IntervalAmounts {
  description: string;
  amount: number;
  category: ExpenseCategory;
  recurringType: RecurringType;
}

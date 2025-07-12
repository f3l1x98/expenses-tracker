import { ExpenseCategory } from '../expenses';
import { RecurringType } from '../shared';

export interface IHouseholdExpense {
  description: string;
  amount: number;
  category: ExpenseCategory;
  recurringType: RecurringType;
  monthlyAmount: number;
  quarterlyAmount: number;
  yearlyAmount: number;
}

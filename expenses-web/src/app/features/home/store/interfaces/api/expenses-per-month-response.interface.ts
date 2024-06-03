import { TotalExpenseOfMonth } from '../total-expense-of-month.interface';

export interface ExpensesPerMonthResponse {
  data: TotalExpenseOfMonth[];
  currency: string;
}

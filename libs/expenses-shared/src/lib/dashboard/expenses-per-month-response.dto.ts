import { TotalExpenseOfMonthDto } from './total-expense-of-month.dto';

export interface ExpensesPerMonthResponse {
  data: TotalExpenseOfMonthDto[];
  currency: string;
}

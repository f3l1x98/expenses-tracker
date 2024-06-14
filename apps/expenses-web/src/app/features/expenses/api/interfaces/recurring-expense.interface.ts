import { Expense } from './expense.interface';

export interface RecurringExpense extends Omit<Expense, 'recurringExpense'> {
  cron: string;
  startDate?: Date;
  endDate?: Date;
}

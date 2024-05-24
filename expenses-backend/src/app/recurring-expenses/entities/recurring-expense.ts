import { IExpense } from 'src/app/expenses/entities/expense';

export interface IRecurringExpense extends Omit<IExpense, 'recurringExpense'> {
  cron: string;
  startDate?: Date;
  endDate?: Date;
}

import { IExpense } from '../expenses';

export interface IRecurringExpense extends Omit<IExpense, 'recurringExpense'> {
  cron: string;
  startDate?: Date;
  endDate?: Date;
}

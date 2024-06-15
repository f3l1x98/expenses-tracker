import { IIncome } from '../incomes';

export interface IRecurringIncome extends Omit<IIncome, 'recurringIncome'> {
  cron: string;
  startDate?: Date;
  endDate?: Date;
}

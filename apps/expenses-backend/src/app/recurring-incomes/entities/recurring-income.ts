import { IIncome } from '../../incomes/entities/income';

export interface IRecurringIncome extends Omit<IIncome, 'recurringIncome'> {
  cron: string;
  startDate?: Date;
  endDate?: Date;
}

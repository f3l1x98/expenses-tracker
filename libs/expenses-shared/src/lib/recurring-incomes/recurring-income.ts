import { IIncome } from '../incomes';
import { RecurringType } from '../shared/recurring-type.enum';

export interface IRecurringIncome extends Omit<IIncome, 'recurringIncome'> {
  cron: string;
  recurringType: RecurringType;
  startDate?: Date;
  endDate?: Date;
}

import { IIncome } from '../incomes';
import { RecurringType } from '../shared/recurring-type.enum';

export interface IRecurringIncome extends Omit<IIncome, 'recurringIncome'> {
  nextExecution: Date;
  recurringType: RecurringType;
  startDate?: Date;
  endDate?: Date;
}

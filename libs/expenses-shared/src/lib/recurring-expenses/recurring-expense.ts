import { IExpense } from '../expenses';
import { RecurringType } from '../shared/recurring-type.enum';

export interface IRecurringExpense extends Omit<IExpense, 'recurringExpense'> {
  nextExecution: Date;
  recurringType: RecurringType;
  startDate?: Date;
  endDate?: Date;
}

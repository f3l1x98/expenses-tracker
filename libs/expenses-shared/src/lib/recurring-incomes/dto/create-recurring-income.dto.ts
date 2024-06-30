import { ICreateIncomeDto } from '../../incomes';
import { RecurringType } from '../../shared/recurring-type.enum';

export interface ICreateRecurringIncomeDto extends ICreateIncomeDto {
  recurringType: RecurringType;
  startDate?: Date;
  endDate?: Date;
}

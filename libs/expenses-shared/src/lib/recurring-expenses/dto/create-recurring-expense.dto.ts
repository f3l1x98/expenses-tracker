import { ICreateExpenseDto } from '../../expenses';
import { RecurringType } from '../../shared/recurring-type.enum';

export interface ICreateRecurringExpenseDto extends ICreateExpenseDto {
  recurringType: RecurringType;
  startDate?: Date;
  endDate?: Date;
}

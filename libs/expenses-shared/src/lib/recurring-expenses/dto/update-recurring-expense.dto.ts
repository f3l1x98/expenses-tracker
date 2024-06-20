import { ICreateRecurringExpenseDto } from './create-recurring-expense.dto';

export interface IUpdateRecurringExpenseDto
  extends Partial<ICreateRecurringExpenseDto> {}

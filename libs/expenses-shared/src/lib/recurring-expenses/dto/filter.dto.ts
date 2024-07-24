import { ExpenseCategory } from '../../expenses';
import { IRecurringFilterBaseDto } from '../../shared/recurring-filter-base.dto';

export interface IRecurringExpenseFilterDto
  extends IRecurringFilterBaseDto<ExpenseCategory> {}

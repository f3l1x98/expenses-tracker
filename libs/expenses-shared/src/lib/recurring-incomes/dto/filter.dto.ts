import { IncomeCategory } from '../../incomes';
import { IRecurringFilterBaseDto } from '../../shared/recurring-filter-base.dto';

export interface IRecurringIncomeFilterDto
  extends IRecurringFilterBaseDto<IncomeCategory> {}

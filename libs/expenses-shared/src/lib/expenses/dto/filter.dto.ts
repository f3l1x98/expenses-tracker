import { IDateRangeDto } from '../../shared/date-range.dto';
import { ExpenseCategory } from '../expense-category';

export interface IFilterDto extends Partial<IDateRangeDto> {
  description?: string;
  category?: ExpenseCategory;
}

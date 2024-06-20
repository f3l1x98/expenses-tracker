import { IDateRangeDto } from '../../shared/date-range.dto';
import { ExpenseCategory } from '../expense-category';

export interface IFilterDto {
  description: string;
  category: ExpenseCategory | undefined;
  dateRange: IDateRangeDto | undefined;
}

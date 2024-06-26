import { IFilterBaseDto } from '../../shared/filter-base.dto';
import { ExpenseCategory } from '../expense-category';

export interface IExpenseFilterDto extends IFilterBaseDto<ExpenseCategory> {}

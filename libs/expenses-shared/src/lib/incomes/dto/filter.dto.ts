import { IFilterBaseDto } from '../../shared/filter-base.dto';
import { IncomeCategory } from '../income-category';

export interface IIncomeFilterDto extends IFilterBaseDto<IncomeCategory> {}

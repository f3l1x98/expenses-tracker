import { IFilterBaseDto } from './filter-base.dto';
import { RecurringType } from './recurring-type.enum';

export interface IRecurringFilterBaseDto<E> extends IFilterBaseDto<E> {
  recurringType?: RecurringType;
}

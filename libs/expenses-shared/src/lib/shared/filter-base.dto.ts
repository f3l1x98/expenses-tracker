import { IDateRangeDto } from './date-range.dto';

export interface IFilterBaseDto<E> extends Partial<IDateRangeDto> {
  description?: string;
  category?: E;
}

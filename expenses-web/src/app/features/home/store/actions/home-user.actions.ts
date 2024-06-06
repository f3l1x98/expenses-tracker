import { createAction, props } from '@ngrx/store';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';

export const setDateRangeFilter = createAction(
  '[Home User Actions] setDateRangeFilter',
  props<{ filter: DateRange }>()
);
export const enterPage = createAction('[Home User Actions] enterPage');

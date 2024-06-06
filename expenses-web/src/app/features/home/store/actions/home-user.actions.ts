import { createAction, props } from '@ngrx/store';
import { DateRange } from '../interfaces/date-range.interface';

export const setDateRangeFilter = createAction(
  '[Home User Actions] setDateRangeFilter',
  props<{ filter: DateRange }>()
);

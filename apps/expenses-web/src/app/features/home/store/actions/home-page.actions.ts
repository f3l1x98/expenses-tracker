import { createAction, props } from '@ngrx/store';
import { DateRange } from '../../../../shared/interfaces/date-range.interface';

export const setDateRangeFilter = createAction(
  '[Home Page Actions] set date range filter',
  props<{ filter: DateRange }>(),
);
export const enterPage = createAction('[Home Page Actions] enter page');

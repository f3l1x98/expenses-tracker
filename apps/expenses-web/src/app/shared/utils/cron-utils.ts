import { RecurringCycle } from '../interfaces/recurring-cycle.enum';

export function constructCron(cycle: RecurringCycle, startDate: Date): string {
  let dayOfWeek = '*';
  let month = '*';
  let dayOfMonth = '*';
  const hour = '2';
  const minute = '0';
  switch (cycle) {
    case RecurringCycle.YEARLY:
      month = `${startDate.getMonth()}`;
      dayOfMonth = `${startDate.getDay()}`;
      break;
    case RecurringCycle.MONTHLY:
      // TODO no support for 'last day of month' -> 31. -> skip all months without a 31st
      dayOfMonth = `${startDate.getDate()}`;
      break;
    case RecurringCycle.WEEKLY:
      dayOfWeek = `${startDate.getDay()}`;
      break;
  }
  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

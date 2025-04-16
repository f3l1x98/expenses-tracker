import { RecurringType } from 'expenses-shared';

export function constructCron(cycle: RecurringType, startDate: Date): string {
  let dayOfWeek = '*';
  let month = '*';
  let dayOfMonth = '*';
  const hour = '2';
  const minute = '0';
  // TODO ATM RecurringType.CUSTOM results into daily
  switch (cycle) {
    case RecurringType.YEARLY:
      month = `${startDate.getMonth()}`;
      dayOfMonth = `${startDate.getDay()}`;
      break;
    case RecurringType.MONTHLY:
      // TODO no support for 'last day of month' -> 31. -> skip all months without a 31st
      dayOfMonth = `${startDate.getDate()}`;
      break;
    case RecurringType.WEEKLY:
      dayOfWeek = `${startDate.getDay()}`;
      break;
  }
  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

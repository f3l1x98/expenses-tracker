import { Pipe, PipeTransform } from '@angular/core';
import { parseExpression } from 'cron-parser';

@Pipe({
  name: 'nextCronExecution',
})
export class NextCronExecutionPipe implements PipeTransform {
  transform(value: string, startDate?: Date): Date {
    const interval = parseExpression(value, {
      currentDate: startDate ?? new Date(),
    });
    return new Date(interval.next().toDate().toDateString());
  }
}

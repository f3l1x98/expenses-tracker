import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCron',
  pure: true,
})
export class FormatCronPipe implements PipeTransform {
  transform(value: string): string {
    const cronParts = value.split(' ');

    if (cronParts.length != 5) {
      return 'Custom';
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = cronParts;

    if (dayOfWeek !== '*' && dayOfMonth === '*' && month === '*') {
      return 'Weekly';
    } else if (dayOfMonth !== '*' && month === '*' && dayOfWeek === '*') {
      return 'Monthly';
    } else if (dayOfMonth !== '*' && month !== '*' && dayOfWeek === '*') {
      return 'Yearly';
    } else {
      return 'Custom';
    }
  }
}

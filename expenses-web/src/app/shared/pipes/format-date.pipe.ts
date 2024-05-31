import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'formatDate',
  pure: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(
    value: string,
    format: string = 'ddd, DD. MMM YYYY, HH:mm'
  ): string {
    return dayjs(value).format(format);
  }
}

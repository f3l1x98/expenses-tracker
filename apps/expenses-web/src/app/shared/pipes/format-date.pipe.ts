import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'formatDate',
  pure: true,
  standalone: false,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | string, format = 'ddd, DD. MMM YYYY, HH:mm'): string {
    return dayjs(value).format(format);
  }
}

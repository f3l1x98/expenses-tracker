import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  pure: true,
  standalone: false,
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  pure: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((substr) => `${substr[0].toUpperCase()}${substr.slice(1)}`)
      .join(' ');
  }
}

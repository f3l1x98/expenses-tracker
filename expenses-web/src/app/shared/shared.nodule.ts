import { NgModule } from '@angular/core';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';

@NgModule({
  imports: [],
  exports: [FormatDatePipe, FormatCurrencyPipe],
  declarations: [FormatDatePipe, FormatCurrencyPipe],
  providers: [],
})
export class SharedModule {}

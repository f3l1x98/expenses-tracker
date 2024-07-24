import { NgModule } from '@angular/core';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { NextCronExecutionPipe } from './pipes/next-cron-execution.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HighlightNegativeCurrencyDirective } from './directives/highlight-negative-currency.directive';

@NgModule({
  imports: [],
  exports: [
    FormatDatePipe,
    FormatCurrencyPipe,
    NextCronExecutionPipe,
    CapitalizePipe,
    HighlightNegativeCurrencyDirective,
  ],
  declarations: [
    FormatDatePipe,
    FormatCurrencyPipe,
    NextCronExecutionPipe,
    CapitalizePipe,
    HighlightNegativeCurrencyDirective,
  ],
  providers: [],
})
export class SharedModule {}

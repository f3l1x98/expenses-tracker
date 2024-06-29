import { NgModule } from '@angular/core';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { HighlightNegativeCurrencyDirective } from './directives/highlight-negative-currency.directive';

@NgModule({
  imports: [],
  exports: [
    FormatDatePipe,
    FormatCurrencyPipe,
    HighlightNegativeCurrencyDirective,
  ],
  declarations: [
    FormatDatePipe,
    FormatCurrencyPipe,
    HighlightNegativeCurrencyDirective,
  ],
  providers: [],
})
export class SharedModule {}

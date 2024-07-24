import { NgModule } from '@angular/core';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HighlightNegativeCurrencyDirective } from './directives/highlight-negative-currency.directive';

@NgModule({
  imports: [],
  exports: [
    FormatDatePipe,
    FormatCurrencyPipe,
    CapitalizePipe,
    HighlightNegativeCurrencyDirective,
  ],
  declarations: [
    FormatDatePipe,
    FormatCurrencyPipe,
    CapitalizePipe,
    HighlightNegativeCurrencyDirective,
  ],
  providers: [],
})
export class SharedModule {}

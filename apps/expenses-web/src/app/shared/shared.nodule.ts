import { NgModule } from '@angular/core';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { NextCronExecutionPipe } from './pipes/next-cron-execution.pipe';
import { FormatCronPipe } from './pipes/format-cron.pipe';

@NgModule({
  imports: [],
  exports: [
    FormatDatePipe,
    FormatCurrencyPipe,
    NextCronExecutionPipe,
    FormatCronPipe,
  ],
  declarations: [
    FormatDatePipe,
    FormatCurrencyPipe,
    NextCronExecutionPipe,
    FormatCronPipe,
  ],
  providers: [],
})
export class SharedModule {}

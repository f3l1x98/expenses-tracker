import { NgModule } from '@angular/core';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { NextCronExecutionPipe } from './pipes/next-cron-execution.pipe';

@NgModule({
  imports: [],
  exports: [FormatDatePipe, FormatCurrencyPipe, NextCronExecutionPipe],
  declarations: [FormatDatePipe, FormatCurrencyPipe, NextCronExecutionPipe],
  providers: [],
})
export class SharedModule {}

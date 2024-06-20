import { ICreateExpenseDto } from '../../expenses';

export interface ICreateRecurringExpenseDto extends ICreateExpenseDto {
  cron: string;
  startDate?: Date;
  endDate?: Date;
}

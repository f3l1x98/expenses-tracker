import { ICreateIncomeDto } from '../../incomes';

export interface ICreateRecurringIncomeDto extends ICreateIncomeDto {
  cron: string;
  startDate?: Date;
  endDate?: Date;
}

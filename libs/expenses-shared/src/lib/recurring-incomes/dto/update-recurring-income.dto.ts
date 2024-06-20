import { ICreateRecurringIncomeDto } from './create-recurring-income.dto';

export interface IUpdateRecurringIncomeDto
  extends Partial<ICreateRecurringIncomeDto> {}

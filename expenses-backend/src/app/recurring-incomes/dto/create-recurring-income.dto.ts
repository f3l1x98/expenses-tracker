import { IsNumber, IsPositive } from 'class-validator';
import { IncomeCategory } from 'src/app/incomes/entities/income-category';
import { IsValidCron } from 'src/app/utils/is-valid-cron';

export abstract class CreateRecurringIncomeDto {
  // TODO has IsCurrency which expects string
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;
  category: IncomeCategory;
  notes?: string;
  @IsValidCron()
  cron: string;
  // TODO ensure start before end
  startDate?: Date;
  endDate?: Date;
}

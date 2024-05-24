import { IsNumber, IsPositive } from 'class-validator';
import { ExpenseCategory } from 'src/app/expenses/entities/expense-category';
import { IsValidCron } from 'src/app/is-valid-cron';

export abstract class CreateRecurringExpenseDto {
  // TODO has IsCurrency which expects string
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;
  category: ExpenseCategory;
  notes?: string;
  @IsValidCron()
  cron: string;
  // TODO ensure start before end
  startDate?: Date;
  endDate?: Date;
}

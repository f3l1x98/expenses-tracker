import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ExpenseCategory } from 'src/app/expenses/entities/expense-category';
import { IsAfterDate } from 'src/app/utils/is-after-date';
import { IsValidCron } from 'src/app/utils/is-valid-cron';

export abstract class CreateRecurringExpenseDto {
  // TODO has IsCurrency which expects string
  @ApiProperty({
    description: 'Monetary amount of each expense of this recurring expense',
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'The category of each expense of this recurring expense',
    required: true,
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;

  @ApiProperty({
    description: 'Additional information about this recurring expense',
    required: false,
  })
  notes?: string;

  @ApiProperty({
    description: 'The cron expression for this recurring expense',
    required: true,
    example: '* * * * *',
  })
  @IsNotEmpty()
  @IsValidCron({
    message: 'This must be a valid cron expression',
  })
  cron: string;

  @ApiProperty({
    description:
      'The start date for the first execution of this recurring expense',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description:
      'The end date for the last execution of this recurring expense',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsAfterDate('startDate', {
    message: 'endDate must be after startDate',
  })
  endDate?: Date;
}

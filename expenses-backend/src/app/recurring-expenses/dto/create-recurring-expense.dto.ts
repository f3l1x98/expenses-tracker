import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ExpenseCategory } from 'src/app/expenses/entities/expense-category';
import { IsAfterDate } from 'src/app/utils/is-after-date';
import { IsValidCron } from 'src/app/utils/is-valid-cron';

export class CreateRecurringExpenseDto {
  @ApiProperty({
    description: 'Description of the expense',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Amount of the recurring expense',
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount!: number;

  @ApiProperty({
    description: 'The category of each expense of this recurring expense',
    required: true,
    enum: ExpenseCategory,
  })
  @IsNotEmpty()
  category: ExpenseCategory;

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
  @IsAfterDate('startDate')
  endDate?: Date;
}

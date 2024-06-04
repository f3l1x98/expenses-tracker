import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { IncomeCategory } from 'src/app/incomes/entities/income-category';
import { IsAfterDate } from 'src/app/utils/is-after-date';
import { IsValidCron } from 'src/app/utils/is-valid-cron';

export class CreateRecurringIncomeDto {
  @ApiProperty({
    description: 'Description of the recurring income',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Amount of the recurring income',
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount!: number;

  @ApiProperty({
    description: 'The category of each income of this recurring income',
    required: true,
    enum: IncomeCategory,
  })
  category: IncomeCategory;

  @ApiProperty({
    description: 'The cron expression for this recurring income',
    required: true,
    example: '* * * * *',
  })
  @IsValidCron()
  cron: string;

  @ApiProperty({
    description:
      'The start date for the first execution of this recurring income',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description: 'The end date for the last execution of this recurring income',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsAfterDate('startDate')
  endDate?: Date;
}

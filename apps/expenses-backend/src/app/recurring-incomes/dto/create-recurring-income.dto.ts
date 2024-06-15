import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { IsAfterDate } from '../../utils/is-after-date';
import { IsValidCron } from '../../utils/is-valid-cron';
import { IncomeCategory } from 'expenses-shared';

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
  @IsNotEmpty()
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
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description: 'The end date for the last execution of this recurring income',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @IsAfterDate('startDate')
  endDate?: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { IsAfterDate } from '../../utils/is-after-date';
import { ICreateRecurringIncomeDto, IncomeCategory } from 'expenses-shared';
import { RecurringType } from 'expenses-shared';

export class CreateRecurringIncomeDto implements ICreateRecurringIncomeDto {
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
  @IsEnum(IncomeCategory)
  category: IncomeCategory;

  @ApiProperty({
    description: 'The recurring type of this recurring income',
    required: true,
    enum: RecurringType,
  })
  @IsNotEmpty()
  @IsEnum(RecurringType)
  recurringType: RecurringType;

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

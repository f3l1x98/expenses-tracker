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
import { ExpenseCategory, ICreateRecurringExpenseDto } from 'expenses-shared';
import { RecurringType } from 'libs/expenses-shared/src/lib/shared/recurring-type.enum';

export class CreateRecurringExpenseDto implements ICreateRecurringExpenseDto {
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
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @ApiProperty({
    description: 'The recurring type of this recurring expense',
    required: true,
    enum: RecurringType,
  })
  @IsNotEmpty()
  @IsEnum(RecurringType)
  recurringType: RecurringType;

  @ApiProperty({
    description:
      'The start date for the first execution of this recurring expense',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description:
      'The end date for the last execution of this recurring expense',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @IsAfterDate('startDate')
  endDate?: Date;
}

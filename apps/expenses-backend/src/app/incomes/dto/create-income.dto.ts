import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { RecurringIncomeEntity } from '../../recurring-incomes/entities/recurring-income.entitiy';
import { ICreateIncomeDto, IncomeCategory } from 'expenses-shared';

export class CreateIncomeDto implements ICreateIncomeDto {
  @ApiProperty({
    description: 'Description of the income',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Amount of the income',
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount!: number;

  @ApiProperty({
    description: 'The category of the income',
    required: true,
    enum: IncomeCategory,
  })
  @IsNotEmpty()
  @IsEnum(IncomeCategory)
  category: IncomeCategory;

  @Exclude()
  recurringIncome?: RecurringIncomeEntity;
}

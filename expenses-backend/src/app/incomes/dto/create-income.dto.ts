import { IncomeCategory } from '../entities/income-category';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';
import { RecurringIncomeEntity } from 'src/app/recurring-incomes/entities/recurring-income.entitiy';

export class CreateIncomeDto {
  @ApiProperty({
    description: 'Description of the income',
    required: true,
  })
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
  category: IncomeCategory;

  @Exclude()
  recurringIncome?: RecurringIncomeEntity;
}

import { IsNumber, IsPositive } from 'class-validator';
import { IncomeCategory } from '../entities/income-category';
import { ApiProperty } from '@nestjs/swagger';

export abstract class CreateIncomeDto {
  // TODO has IsCurrency which expects string
  @ApiProperty({
    description: 'Monetary amount of the income',
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'The category of the income',
    required: true,
    enum: IncomeCategory,
  })
  category: IncomeCategory;

  @ApiProperty({
    description: 'Additional information about the income',
    required: false,
  })
  notes?: string;
}

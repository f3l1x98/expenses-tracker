import { IsNumber, IsPositive } from 'class-validator';
import { ExpenseCategory } from '../entities/expense-category';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  // TODO has IsCurrency which expects string
  @ApiProperty({
    description: 'Monetary amount of the expense',
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'The category of the expense',
    required: true,
    enum: ExpenseCategory,
  })
  category: ExpenseCategory;

  @ApiProperty({
    description: 'Additional information about the expense',
    required: false,
  })
  notes?: string;
}

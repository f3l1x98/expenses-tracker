import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { RecurringExpenseEntity } from '../../recurring-expenses/entities/recurring-expense.entity';
import { ExpenseCategory } from 'expenses-shared';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Description of the expense',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Amount of the expense',
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount!: number;

  @ApiProperty({
    description: 'The category of the expense',
    required: true,
    enum: ExpenseCategory,
  })
  @IsNotEmpty()
  category: ExpenseCategory;

  @Exclude()
  recurringExpense?: RecurringExpenseEntity;
}

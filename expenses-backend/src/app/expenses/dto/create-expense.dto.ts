import { ExpenseCategory } from '../entities/expense-category';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';
import { RecurringExpenseEntity } from 'src/app/recurring-expenses/entities/recurring-expense.entity';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Description of the expense',
    required: true,
  })
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
  category: ExpenseCategory;

  @Exclude()
  recurringExpense?: RecurringExpenseEntity;
}

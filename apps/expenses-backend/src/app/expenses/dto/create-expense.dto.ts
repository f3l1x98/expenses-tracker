import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { RecurringExpenseEntity } from '../../recurring-expenses/entities/recurring-expense.entity';
import { ExpenseCategory, ICreateExpenseDto } from 'expenses-shared';

export class CreateExpenseDto implements ICreateExpenseDto {
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
  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @Exclude()
  recurringExpense?: RecurringExpenseEntity;
}

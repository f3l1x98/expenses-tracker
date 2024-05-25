import { ExpenseCategory } from '../entities/expense-category';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { RecurringExpenseEntity } from 'src/app/recurring-expenses/entities/recurring-expense.entity';
import { PriceDto } from 'src/app/shared/prices/price.dto';

export class CreateExpenseDto {
  @ApiProperty({
    description: 'Price of the expense',
    required: true,
  })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

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

  @Exclude()
  recurringExpense?: RecurringExpenseEntity;
}

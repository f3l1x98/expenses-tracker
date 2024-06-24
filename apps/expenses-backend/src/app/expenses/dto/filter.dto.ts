import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ExpenseCategory, IExpenseFilterDto } from 'expenses-shared';
import { DateRangeDto } from '../../shared/date-range.dto';
import { PartialType } from '@nestjs/mapped-types';

export class ExpensesFilterDto
  extends PartialType(DateRangeDto)
  implements IExpenseFilterDto
{
  @ApiProperty({
    description: 'Description of the expense',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Description of the expense',
    required: false,
    enum: ExpenseCategory,
  })
  @IsOptional()
  @IsEnum(ExpenseCategory)
  category?: ExpenseCategory;
}

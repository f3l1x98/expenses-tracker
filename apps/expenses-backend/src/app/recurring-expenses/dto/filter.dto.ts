import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { IRecurringExpenseFilterDto, RecurringType } from 'expenses-shared';
import { ExpensesFilterDto } from '../../expenses/dto/filter.dto';

export class RecurringExpensesFilterDto
  extends ExpensesFilterDto
  implements IRecurringExpenseFilterDto
{
  @ApiProperty({
    description: 'RecurringType of the expense',
    required: false,
    enum: RecurringType,
  })
  @IsOptional()
  @IsEnum(RecurringType)
  recurringType?: RecurringType;
}

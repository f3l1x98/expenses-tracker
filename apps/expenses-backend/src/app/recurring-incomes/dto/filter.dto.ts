import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { IRecurringIncomeFilterDto, RecurringType } from 'expenses-shared';
import { IncomesFilterDto } from '../../incomes/dto/filter.dto';

export class RecurringIncomeFilterDto
  extends IncomesFilterDto
  implements IRecurringIncomeFilterDto
{
  @ApiProperty({
    description: 'RecurringType of the income',
    required: false,
    enum: RecurringType,
  })
  @IsOptional()
  @IsEnum(RecurringType)
  recurringType?: RecurringType;
}

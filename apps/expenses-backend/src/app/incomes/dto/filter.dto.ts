import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IIncomeFilterDto, IncomeCategory } from 'expenses-shared';
import { DateRangeDto } from '../../shared/date-range.dto';
import { PartialType } from '@nestjs/mapped-types';

export class IncomesFilterDto
  extends PartialType(DateRangeDto)
  implements IIncomeFilterDto
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
    enum: IncomeCategory,
  })
  @IsOptional()
  @IsEnum(IncomeCategory)
  category?: IncomeCategory;
}

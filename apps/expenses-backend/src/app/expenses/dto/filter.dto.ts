import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ExpenseCategory, IFilterDto } from 'expenses-shared';
import { DateRangeDto } from '../../shared/date-range.dto';
import { PartialType } from '@nestjs/mapped-types';

export class FilterDto extends PartialType(DateRangeDto) implements IFilterDto {
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
  @IsString()
  category?: ExpenseCategory;
}

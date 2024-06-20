import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ExpenseCategory, IFilterDto } from 'expenses-shared';
import { DateRangeDto } from '../../shared/date-range.dto';

export class FilterDto implements IFilterDto {
  @ApiProperty({
    description: 'Description of the expense',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Description of the expense',
    required: false,
    enum: ExpenseCategory,
  })
  @IsOptional()
  @IsString()
  category: ExpenseCategory;

  @ApiProperty({
    description: 'Description of the expense',
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeDto)
  dateRange: DateRangeDto;
}

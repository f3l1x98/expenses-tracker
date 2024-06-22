import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { IDateRangeDto } from 'expenses-shared';
import { IsAfterDate } from '../utils/is-after-date';

export class DateRangeDto implements IDateRangeDto {
  @ApiProperty({
    description: 'Description of the expense',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Description of the expense',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @IsAfterDate('startDate')
  @Type(() => Date)
  endDate?: Date;
}

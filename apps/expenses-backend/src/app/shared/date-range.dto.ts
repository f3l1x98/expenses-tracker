import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { IDateRangeDto } from 'expenses-shared';

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
  @Type(() => Date)
  endDate?: Date;
}

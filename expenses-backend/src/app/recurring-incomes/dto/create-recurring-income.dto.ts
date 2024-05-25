import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { IncomeCategory } from 'src/app/incomes/entities/income-category';
import { PriceDto } from 'src/app/shared/prices/price.dto';
import { IsAfterDate } from 'src/app/utils/is-after-date';
import { IsValidCron } from 'src/app/utils/is-valid-cron';

export abstract class CreateRecurringIncomeDto {
  @ApiProperty({
    description: 'Price of the recurring income',
    required: true,
  })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @ApiProperty({
    description: 'The category of each income of this recurring income',
    required: true,
    enum: IncomeCategory,
  })
  category: IncomeCategory;

  @ApiProperty({
    description: 'Additional information about this recurring income',
    required: false,
  })
  notes?: string;

  @ApiProperty({
    description: 'The cron expression for this recurring income',
    required: true,
    example: '* * * * *',
  })
  @IsValidCron()
  cron: string;

  @ApiProperty({
    description:
      'The start date for the first execution of this recurring income',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description: 'The end date for the last execution of this recurring income',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsAfterDate('startDate')
  endDate?: Date;
}

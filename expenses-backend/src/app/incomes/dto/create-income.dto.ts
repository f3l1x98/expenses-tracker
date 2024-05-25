import { IncomeCategory } from '../entities/income-category';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { RecurringIncomeEntity } from 'src/app/recurring-incomes/entities/recurring-income.entitiy';
import { PriceDto } from 'src/app/shared/prices/price.dto';

export class CreateIncomeDto {
  @ApiProperty({
    description: 'Price of the income',
    required: true,
  })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @ApiProperty({
    description: 'The category of the income',
    required: true,
    enum: IncomeCategory,
  })
  category: IncomeCategory;

  @ApiProperty({
    description: 'Additional information about the income',
    required: false,
  })
  notes?: string;

  @Exclude()
  recurringIncome?: RecurringIncomeEntity;
}

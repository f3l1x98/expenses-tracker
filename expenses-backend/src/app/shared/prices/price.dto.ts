import { ApiProperty } from '@nestjs/swagger';
import { IsISO4217CurrencyCode, IsNumber, IsPositive } from 'class-validator';
import { IPrice } from './price';

export class PriceDto implements IPrice {
  @ApiProperty({
    description: 'Amount of the price',
    required: true,
  })
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount!: number;

  @ApiProperty({
    description: 'ISO4217 currency code of the price',
    required: true,
  })
  @IsISO4217CurrencyCode()
  currency!: string;
}

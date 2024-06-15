import { ApiProperty } from '@nestjs/swagger';
import { IsISO4217CurrencyCode } from 'class-validator';
import { IUserSettings } from 'expenses-shared';

export class UserSettingsDto implements IUserSettings {
  @ApiProperty({
    description: 'ISO4217 currency code of the price',
    required: true,
  })
  @IsISO4217CurrencyCode()
  currency!: string;
}

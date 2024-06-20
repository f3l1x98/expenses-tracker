import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { UserSettingsDto } from './user-settings.dto';
import { Type } from 'class-transformer';
import { ICreateUserDto, defaultSettings } from 'expenses-shared';

export abstract class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    description: 'Username of new user',
    required: true,
    pattern: '^[a-zA-Z0-9]+$',
  })
  @IsNotEmpty()
  @IsAlphanumeric()
  username!: string;

  @ApiProperty({
    description: 'Encrypted password for new user',
    required: true,
  })
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    description: 'Settings of new user',
    required: false,
    default: defaultSettings,
  })
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserSettingsDto)
  settings: UserSettingsDto = defaultSettings;
}

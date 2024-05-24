import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export abstract class CreateUserDto {
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
}

import { ApiProperty } from '@nestjs/swagger';

export abstract class LoginUserDto {
  @ApiProperty({
    description: 'Username of user to be logged in',
    required: true,
  })
  readonly username!: string;

  @ApiProperty({
    description: 'Password of user to be logged in',
    required: true,
  })
  readonly password!: string;
}

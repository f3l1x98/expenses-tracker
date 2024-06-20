import { ApiProperty } from '@nestjs/swagger';
import { ILoginUserDto } from 'expenses-shared';

export abstract class LoginUserDto implements ILoginUserDto {
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

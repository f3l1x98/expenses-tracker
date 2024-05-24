import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export abstract class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username!: string;

  @IsNotEmpty()
  password!: string;
}

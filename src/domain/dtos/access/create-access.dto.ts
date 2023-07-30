import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAccessDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  password: string;
}

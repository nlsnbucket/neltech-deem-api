import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  email?: string;
}

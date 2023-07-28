import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEligibilityDto {
  @IsNotEmpty()
  @IsBoolean()
  type: boolean;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}

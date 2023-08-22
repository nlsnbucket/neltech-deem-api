import { IsOptional } from 'class-validator';

export class SearchEligibilityDto {
  @IsOptional()
  userId: number;

  orderId: number;
}

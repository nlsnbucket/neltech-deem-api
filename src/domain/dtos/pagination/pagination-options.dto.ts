import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationOptionsDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  per_page?: number;

  constructor() {
    if (!this.page) this.page = 1;
    if (!this.per_page) this.per_page = 10;
  }
}

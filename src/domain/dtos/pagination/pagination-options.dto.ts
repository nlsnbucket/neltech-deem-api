import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationOptionsDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(25)
  per_page?: number;

  constructor() {
    if (!this.page) this.page = 1;
    if (!this.per_page) this.per_page = 10;
  }
}

import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationOptionsDto {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsNumberString()
  @IsOptional()
  per_page?: string;

  constructor() {
    if (!this.page) this.page = '1';
    if (!this.per_page) this.per_page = '10';
  }
}

import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsDto } from '../pagination';

export class SearchUserDto extends PaginationOptionsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  name_not?: string;

  @IsString()
  @IsOptional()
  name_contains?: string;

  @IsString()
  @IsOptional()
  name_starts_with?: string;

  @IsString()
  @IsOptional()
  name_ends_with?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  username_not?: string;

  @IsString()
  @IsOptional()
  username_contains?: string;

  @IsString()
  @IsOptional()
  username_starts_with?: string;

  @IsString()
  @IsOptional()
  username_ends_with?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  email_not?: string;

  @IsString()
  @IsOptional()
  email_contains?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  phone_not?: string;

  @IsString()
  @IsOptional()
  phone_contains?: string;
}

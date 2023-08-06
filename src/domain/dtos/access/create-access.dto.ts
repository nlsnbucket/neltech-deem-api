import { IsNotEmpty, IsString } from 'class-validator';
import { ACCESS_PROVIDER } from 'src/domain/enums';

export class CreateAccessDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  provider: ACCESS_PROVIDER;
}

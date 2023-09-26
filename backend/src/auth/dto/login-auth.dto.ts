import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginAuthDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  ciNumber: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

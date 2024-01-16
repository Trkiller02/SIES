import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    pattern: '^[VE]\\d+$',
  })
  @IsOptional()
  @IsString()
  ciNumber?: string;

  @ApiProperty({
    minLength: 4,
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

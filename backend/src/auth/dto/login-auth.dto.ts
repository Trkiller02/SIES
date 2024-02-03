import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiPropertyOptional({
    pattern: '/^([^s@]+@[^s@]+.[^s@]+|[VEve]d+)$/',
    examples: ['V8712765', 'E298712342', 'johndoe23@user.com'],
    type: String,
  })
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.match(/^[VE]\d+$/)
        ? value.toUpperCase().trim()
        : value.trim()
      : value,
  )
  @IsNotEmpty()
  query: string;

  @ApiProperty({
    minLength: 4,
    type: String,
  })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

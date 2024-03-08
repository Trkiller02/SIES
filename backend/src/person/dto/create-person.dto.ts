import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    pattern: '^[VEve]\\d+$',
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  ci_number: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  home_dir: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  home_parroquia: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  home_municipio: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    pattern: '^[VE]\\d+$',
  })
  @IsString()
  @IsNotEmpty()
  ci_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
  @IsNotEmpty()
  home_dir: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  home_parroquia: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  home_municipio: string;
}

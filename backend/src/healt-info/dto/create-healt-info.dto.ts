import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHealtInfoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type_aler?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trata_esp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prefer_act?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recre_time?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  site_act?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  live_with;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sex: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lateralidad?: string;
}

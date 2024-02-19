import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class createExcelDto {
  @ApiProperty()
  @IsString()
  entity: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  etapa?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  section?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  level?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;
}

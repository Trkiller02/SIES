import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRelationsTableDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  represent_id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ficha_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mother_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  father_id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  health_info_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  student_id: string;
}

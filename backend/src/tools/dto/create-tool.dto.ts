import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateToolDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';

export class CreateFichaDto {
  @ApiProperty({
    minimum: 1,
    maximum: 6,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  level: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  etapa: string;

  @ApiProperty({
    type: 'varchar',
  })
  @IsNotEmpty()
  @IsString()
  turno: string;

  @ApiProperty({
    type: 'varchar',
  })
  @IsNotEmpty()
  @IsString()
  section: string;

  @ApiProperty({
    type: 'text',
  })
  @IsNotEmpty()
  @IsString()
  proce_plant: string;

  @ApiPropertyOptional({
    type: 'varchar',
  })
  @IsOptional()
  @IsString()
  escolar_period: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  egresado?: boolean;
}

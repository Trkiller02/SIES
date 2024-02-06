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

  @ApiProperty({
    minLength: 1,
    maxLength: 1,
    type: 'varchar',
    enum: ['M', 'S'],
  })
  @IsNotEmpty()
  @IsString()
  etapa: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 1,
    type: 'varchar',
    enum: ['M', 'T'],
  })
  @IsNotEmpty()
  @IsString()
  turno: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 1,
    type: 'varchar',
  })
  @IsNotEmpty()
  @IsString()
  section: string;

  @ApiProperty({
    minLength: 1,
    type: 'varchar',
  })
  @IsNotEmpty()
  @IsString()
  proce_plant: string;

  @ApiPropertyOptional({
    minLength: 4,
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

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
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

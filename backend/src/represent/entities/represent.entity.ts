import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Person } from 'src/person/entities/person.entity';

export class Represent extends Person {
  @ApiPropertyOptional({
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tlfnHome?: string;

  @ApiPropertyOptional({
    type: 'text',
    minLength: 4,
  })
  @IsOptional()
  @IsString()
  workPlace?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  workPhoneNumber?: string;

  @ApiPropertyOptional({
    type: 'int',
    minimum: 1,
  })
  @IsOptional()
  @IsString()
  incomeMonth?: number;
}

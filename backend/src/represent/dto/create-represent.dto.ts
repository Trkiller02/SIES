import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CreateRepresentDto extends CreatePersonDto {
  @ApiPropertyOptional({
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tlfn_home?: string;

  @ApiPropertyOptional({
    type: 'text',
    minLength: 4,
  })
  @IsOptional()
  @IsString()
  work_place?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  work_phone_number?: string;

  @ApiPropertyOptional({
    type: 'int',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  income_month?: number;
}

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
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  incomeMonth?: number;
}

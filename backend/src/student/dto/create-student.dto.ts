import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsNotEmptyObject,
} from 'class-validator';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmptyObject()
  person_id: CreatePersonDto;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  born_place: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  born_state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  born_municipio: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  born_parroquia: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  born_pais: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  born_date: string;
}

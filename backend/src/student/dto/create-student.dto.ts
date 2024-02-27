import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  born_place: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  born_state: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  born_municipio: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  born_parroquia: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  born_pais: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  born_date: string;
}
